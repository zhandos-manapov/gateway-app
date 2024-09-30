import { ORDER_STATES_PATTERNS } from '@app/contracts/states-app'
import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { OrderStatesService } from './order-states.service'

@Controller()
export class OrderStatesController {
  constructor(private orderStatesService: OrderStatesService) {}

  @EventPattern(ORDER_STATES_PATTERNS.CREATED)
  handleOrderCreated(id: string) {
    this.orderStatesService.handleOrderCreated(id)
  }

  @EventPattern(ORDER_STATES_PATTERNS.UPDATED)
  handleOrderUpdated(id: string) {
    this.orderStatesService.handleOrderUpdated(id)
  }

  @EventPattern(ORDER_STATES_PATTERNS.DELETED)
  handleOrderDeleted(message: string) {
    this.orderStatesService.handleOrderDeleted(message)
  }
}
