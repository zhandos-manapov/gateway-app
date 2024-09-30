import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EnvironmentVariables } from '@app/env-config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  const config = new DocumentBuilder()
    .setTitle('Store API')
    .setDescription('This is the API docs for a Store')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  const configService = app.get(ConfigService<EnvironmentVariables>)
  const PORT = configService.get<number>('GATEWAY_APP_PORT')

  await app.listen(PORT)
}
bootstrap()
