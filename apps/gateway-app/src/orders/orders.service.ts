import { DeleteResponseDto as ClientDeleteResponseDto } from '@app/contracts/common/dto'
import {
  CreateOrderDto as ClientCreateOrderDto,
  OrderResponseDto as ClientOrderResponseDto,
  ORDERS_PATTERNS,
  UpdateOrderDto as ClientUpdateOrderDto
} from '@app/contracts/orders-app'
import { Inject, Injectable } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'

import { ORDERS_SERVICE } from '../clients/constants'
import { CreateOrderDto, UpdateOrderDto } from './dto'

@Injectable()
export class OrdersService {
  constructor(@Inject(ORDERS_SERVICE) private readonly ordersClient: ClientKafka) {}

  create(createOrderDto: CreateOrderDto) {
    return this.ordersClient.send<ClientOrderResponseDto, ClientCreateOrderDto>(
      ORDERS_PATTERNS.CREATE,
      createOrderDto
    )
  }

  findAll() {
    return this.ordersClient.send<ClientOrderResponseDto[]>(ORDERS_PATTERNS.FIND_ALL, {})
  }

  findOne(id: string) {
    return this.ordersClient.send<ClientOrderResponseDto>(ORDERS_PATTERNS.FIND_ONE, id)
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.ordersClient.send<ClientOrderResponseDto, ClientUpdateOrderDto>(
      ORDERS_PATTERNS.UPDATE,
      {
        id,
        ...updateOrderDto
      }
    )
  }

  remove(id: string) {
    return this.ordersClient.send<ClientDeleteResponseDto, string>(ORDERS_PATTERNS.REMOVE, id)
  }
}
