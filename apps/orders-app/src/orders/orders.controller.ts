import {
  CreateOrderDto,
  OrderResponseDto,
  ORDERS_PATTERNS,
  UpdateOrderDto
} from '@app/contracts/orders-app'
import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { OrdersService } from './orders.service'
import { DeleteResponseDto } from '@app/contracts/common/dto'

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern(ORDERS_PATTERNS.CREATE)
  async create(@Payload() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto)
    return new OrderResponseDto(order.id, order.client, order.product, order.quantity)
  }

  @MessagePattern(ORDERS_PATTERNS.FIND_ALL)
  findAll() {
    return this.ordersService.findAll()
  }

  @MessagePattern(ORDERS_PATTERNS.FIND_ONE)
  async findOne(@Payload() id: string) {
    const order = await this.ordersService.findOne(id)
    return new OrderResponseDto(order.id, order.client, order.product, order.quantity)
  }

  @MessagePattern(ORDERS_PATTERNS.UPDATE)
  async update(@Payload() updateOrderDto: UpdateOrderDto) {
    const order = await this.ordersService.update(updateOrderDto.id, updateOrderDto)
    return new OrderResponseDto(order.id, order.client, order.product, order.quantity)
  }

  @MessagePattern(ORDERS_PATTERNS.REMOVE)
  async remove(@Payload() id: string) {
    const result = await this.ordersService.remove(id)
    return new DeleteResponseDto(
      result.affected > 0,
      `Order with ID ${id} deleted successfully`,
      result.affected
    )
  }
}
