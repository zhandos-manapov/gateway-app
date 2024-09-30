import { ClientsModule, Transport } from '@nestjs/microservices'

import { ORDERS_SERVICE } from './constants'
import { ConfigService } from '@nestjs/config'
import { EnvironmentVariables, NODE_ENV } from '@app/env-config'

export const OrdersAppClient = ClientsModule.registerAsync([
  {
    name: ORDERS_SERVICE,
    inject: [ConfigService],
    useFactory: (configService: ConfigService<EnvironmentVariables>) => {
      const environment = configService.get<string>('GATEWAY_APP_ENV')

      return {
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: configService.get<string>('KAFKA_ORDERS_CLIENT_ID'),
            brokers: [
              environment === NODE_ENV.PRODUCTION
                ? configService.get<string>('KAFKA_BROKER_URL')
                : 'localhost:9093'
            ]
          },
          consumer: {
            groupId: configService.get<string>('KAFKA_ORDERS_GROUP_ID')
          }
        }
      }
    }
  }
])
