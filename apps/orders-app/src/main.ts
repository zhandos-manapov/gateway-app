import { EnvironmentVariables, NODE_ENV } from '@app/env-config'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { OrdersAppModule } from './orders-app.module'

async function bootstrap() {
  const app = await NestFactory.create(OrdersAppModule)
  const configService = app.get(ConfigService<EnvironmentVariables>)

  const environment = configService.get<string>('ORDERS_APP_ENV')
  const kafkaBrokerUrl = configService.get<string>('KAFKA_BROKER_URL')

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [environment === NODE_ENV.PRODUCTION ? kafkaBrokerUrl : 'localhost:9093'],
        retry: {
          retries: 10
        }
      },
      consumer: {
        groupId: configService.get<string>('KAFKA_ORDERS_GROUP_ID')
      }
    }
  })

  await app.startAllMicroservices()
}
bootstrap()
