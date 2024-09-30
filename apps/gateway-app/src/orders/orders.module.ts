import { Module } from '@nestjs/common'

import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'
import { OrdersAppClient } from '../clients/orders-app-client'
import { StatesAppClient } from '../clients/states-app-client'

@Module({
  imports: [OrdersAppClient, StatesAppClient],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
