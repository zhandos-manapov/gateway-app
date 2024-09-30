import * as Joi from 'joi'

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { NODE_ENV } from './enums'
import { EnvConfigService } from './env-config.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_DB: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_DOCKER_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),

        // Orders Microservice
        ORDERS_APP_ENV: Joi.string().required().valid(NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION),

        // States Microservice
        STATES_APP_ENV: Joi.string().required().valid(NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION),

        // Kafka
        KAFKA_BROKER_URL: Joi.string().required(),

        KAFKA_ORDERS_CLIENT_ID: Joi.string().required(),
        KAFKA_ORDERS_GROUP_ID: Joi.string().required(),

        KAFKA_STATES_CLIENT_ID: Joi.string().required(),
        KAFKA_STATES_GROUP_ID: Joi.string().required()
      })
    })
  ],
  providers: [EnvConfigService],
  exports: [EnvConfigService]
})
export class EnvConfigModule {}
