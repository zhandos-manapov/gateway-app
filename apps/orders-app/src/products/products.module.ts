import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductEntity } from './entities'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductsService],
  exports: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
