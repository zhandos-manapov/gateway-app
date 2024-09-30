import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductEntity } from './entities'
import { CreateProductDto } from '@app/contracts/orders-app'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>
  ) {}

  async findOne(id: string) {
    return await this.productRepository.findOneBy({ id })
  }

  findAll() {
    return this.productRepository.find()
  }

  async create(createProductDto: CreateProductDto) {
    const productEntity = this.productRepository.create(createProductDto)
    return await this.productRepository.save(productEntity)
  }
}
