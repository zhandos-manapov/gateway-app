import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OrderEntity } from './entities'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'
import { UsersModule } from '../users/users.module'
import { ProductsModule } from '../products/products.module'

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), UsersModule, ProductsModule],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
