import { plainToInstance } from 'class-transformer'

import { CreateProductDto, ProductResponseDto, PRODUCTS_PATTERNS } from '@app/contracts/orders-app'
import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { ProductsService } from './products.service'

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern(PRODUCTS_PATTERNS.CREATE)
  async create(@Payload() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto)
    return plainToInstance(ProductResponseDto, product, { excludeExtraneousValues: true })
  }

  @MessagePattern(PRODUCTS_PATTERNS.FIND_ALL)
  async findAll() {
    const products = await this.productsService.findAll()
    return plainToInstance(ProductResponseDto, products, { excludeExtraneousValues: true })
  }
}
