import { NODE_ENV } from '../enums'

export interface EnvironmentVariables {
  // Database variables
  DATABASE_USER: string
  DATABASE_PASSWORD: string
  DATABASE_DB: string
  DATABASE_HOST: string
  DATABASE_DOCKER_HOST: string
  DATABASE_PORT: number

  // Orders Microservice variables
  ORDERS_APP_ENV: NODE_ENV

  // State Microservice variables
  STATES_APP_ENV: NODE_ENV

  // Gateway REST API
  GATEWAY_APP_ENV: NODE_ENV
  GATEWAY_APP_PORT: number

  // Kafka service
  KAFKA_BROKER_URL: string

  KAFKA_ORDERS_CLIENT_ID: string
  KAFKA_ORDERS_GROUP_ID: string

  KAFKA_STATES_CLIENT_ID: string
  KAFKA_STATES_GROUP_ID: string
}
