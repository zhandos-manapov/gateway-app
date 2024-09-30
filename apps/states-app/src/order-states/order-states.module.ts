import { Module } from '@nestjs/common'
import { OrderStatesController } from './order-states.controller'
import { OrderStatesService } from './order-states.service'

@Module({
  controllers: [OrderStatesController],
  providers: [OrderStatesService]
})
export class OrderStatesModule {}
