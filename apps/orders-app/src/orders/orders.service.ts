import { DeepPartial, Repository } from 'typeorm'

import { CreateOrderDto, UpdateOrderDto } from '@app/contracts/orders-app'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { ProductsService } from '../products/products.service'
import { UsersService } from '../users/users.service'
import { OrderEntity } from './entities'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const user = await this.usersService.findOne(createOrderDto.clientId)
    const product = await this.productsService.findOne(createOrderDto.productId)

    const orderEntity = this.orderRepository.create({
      ...createOrderDto,
      client: user,
      product
    })

    return await this.orderRepository.save(orderEntity)
  }

  async saveEntity(order: OrderEntity) {
    const orderEntity = this.orderRepository.create(order)
    return await this.orderRepository.save(orderEntity)
  }

  getEntity(order: DeepPartial<OrderEntity>) {
    return this.orderRepository.create(order)
  }

  async findAll() {
    return await this.orderRepository.find({ relations: ['client', 'product'] })
  }

  async findOne(id: string) {
    return await this.orderRepository.findOne({ where: { id }, relations: ['client', 'product'] })
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const user = await this.usersService.findOne(updateOrderDto.clientId)
    const product = await this.productsService.findOne(updateOrderDto.productId)

    const existingOrderEntity = await this.findOne(id)

    const orderEntity = this.orderRepository.create({
      ...existingOrderEntity,
      ...updateOrderDto,
      client: user,
      product
    })
    return await this.orderRepository.save(orderEntity)
  }

  async remove(id: string) {
    return await this.orderRepository.delete({ id })
  }
}
