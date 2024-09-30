import { Repository } from 'typeorm'

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { OrderEntity } from '../orders/entities'
import { ProductEntity } from '../products/entities'
import { UserEntity } from '../users/entities'

const userPayload = {
  firstName: 'Zhandos',
  lastName: 'Manapov'
}

const productPayload = {
  name: 'macbook air'
}

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>
  ) {}

  async seed() {
    const user = await this.seedUser()
    const product = await this.seedProduct()
    await this.seedOrder(user, product, 1)
  }

  private async seedUser() {
    const userExists = await this.userRepository.findOneBy({
      firstName: userPayload.firstName,
      lastName: userPayload.lastName
    })

    if (!userExists) {
      const user = this.userRepository.create(userPayload)
      return await this.userRepository.save(user)
    } else {
      return userExists
    }
  }

  private async seedProduct() {
    const productExists = await this.productRepository.findOneBy({ name: productPayload.name })

    if (!productExists) {
      const product = this.productRepository.create(productPayload)
      return await this.productRepository.save(product)
    } else {
      return productExists
    }
  }

  private async seedOrder(client: UserEntity, product: ProductEntity, quantity: number) {
    const order = this.orderRepository.create({ client, product, quantity })
    await this.orderRepository.save(order)
  }
}
