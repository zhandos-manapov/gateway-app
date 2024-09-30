import { Module } from '@nestjs/common'

import { OrdersAppClient } from '../clients/orders-app-client'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
  imports: [OrdersAppClient],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
