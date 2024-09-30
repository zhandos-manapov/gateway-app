import { EnvConfigModule } from '@app/env-config'
import { Module } from '@nestjs/common'

import { DatabaseModule } from './database/database.module'
import { OrderStatesModule } from './order-states/order-states.module'
import { StatesAppController } from './states-app.controller'
import { StatesAppService } from './states-app.service'

@Module({
  imports: [OrderStatesModule, EnvConfigModule, DatabaseModule],
  controllers: [StatesAppController],
  providers: [StatesAppService]
})
export class StatesAppModule {}
