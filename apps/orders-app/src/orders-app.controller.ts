import { Controller, Get } from '@nestjs/common'
import { OrdersAppService } from './orders-app.service'

@Controller()
export class OrdersAppController {
  constructor(private readonly ordersAppService: OrdersAppService) {}

  @Get()
  getHello(): string {
    return this.ordersAppService.getHello()
  }
}
