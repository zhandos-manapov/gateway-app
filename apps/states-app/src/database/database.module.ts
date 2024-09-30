import { EnvironmentVariables, NODE_ENV } from '@app/env-config'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        type: 'postgres',
        host:
          configService.get<string>('STATES_APP_ENV') === NODE_ENV.PRODUCTION
            ? configService.get<string>('DATABASE_DOCKER_HOST')
            : configService.get<string>('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_DB'),
        autoLoadEntities: true,
        synchronize: false,
        logging: configService.get<string>('STATES_APP_ENV') === NODE_ENV.DEVELOPMENT,
        retryAttempts: 20
      })
    })
  ]
})
export class DatabaseModule {}
