import { EnvConfigModule } from '@app/env-config'
import { Module } from '@nestjs/common'

import { DatabaseModule } from './database/database.module'
import { OrdersAppController } from './orders-app.controller'
import { OrdersAppService } from './orders-app.service'
import { OrdersModule } from './orders/orders.module'
import { ProductsModule } from './products/products.module'
import { SeederService } from './seeder/seeder.service'
import { UsersModule } from './users/users.module'

@Module({
  imports: [OrdersModule, ProductsModule, UsersModule, DatabaseModule, EnvConfigModule],
  controllers: [OrdersAppController],
  providers: [OrdersAppService, SeederService]
})
export class OrdersAppModule {}
