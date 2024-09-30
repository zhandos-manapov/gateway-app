import { Inject, Injectable } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'

import { ORDERS_SERVICE } from '../clients/constants'
import { CreateProductDto } from './dto/create-product.dto'
import {
  CreateProductDto as ClientCreateProductDto,
  ProductResponseDto,
  PRODUCTS_PATTERNS
} from '@app/contracts/orders-app'

@Injectable()
export class ProductsService {
  constructor(@Inject(ORDERS_SERVICE) private readonly ordersClient: ClientKafka) {}

  create(createProductDto: CreateProductDto) {
    return this.ordersClient.send<ProductResponseDto, ClientCreateProductDto>(
      PRODUCTS_PATTERNS.CREATE,
      createProductDto
    )
  }

  findAll() {
    return this.ordersClient.send<ProductResponseDto[]>(PRODUCTS_PATTERNS.FIND_ALL, {})
  }
}
