import { Observable } from 'rxjs'

import { PRODUCTS_PATTERNS } from '@app/contracts/orders-app'
import { Body, Controller, Get, Inject, OnModuleInit, Post } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { ORDERS_SERVICE } from '../clients/constants'
import { ProductResponseDto } from './dto'
import { CreateProductDto } from './dto/create-product.dto'
import { ProductsService } from './products.service'

@ApiTags('products')
@Controller('products')
export class ProductsController implements OnModuleInit {
  constructor(
    @Inject(ORDERS_SERVICE) private readonly ordersClient: ClientKafka,
    private readonly productsService: ProductsService
  ) {}

  onModuleInit() {
    Object.values(PRODUCTS_PATTERNS).forEach((topic) =>
      this.ordersClient.subscribeToResponseOf(topic)
    )
  }

  @Post()
  @ApiResponse({ type: ProductResponseDto })
  create(@Body() createProductDto: CreateProductDto): Observable<ProductResponseDto> {
    return this.productsService.create(createProductDto)
  }

  @Get()
  @ApiResponse({ type: [ProductResponseDto] })
  findAll(): Observable<ProductResponseDto[]> {
    return this.productsService.findAll()
  }
}
