import { Module } from '@nestjs/common'

import { OrdersAppClient } from '../clients/orders-app-client'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [OrdersAppClient],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
