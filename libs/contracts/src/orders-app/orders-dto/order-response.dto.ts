import { Expose } from 'class-transformer'

import { ProductResponseDto } from '../products-dto'
import { UserResponseDto } from '../users-dto'

export class OrderResponseDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly client: UserResponseDto

  @Expose()
  readonly product: ProductResponseDto

  @Expose()
  readonly quantity: number

  constructor(id: string, client: UserResponseDto, product: ProductResponseDto, quantity) {
    this.id = id
    this.client = client
    this.product = product
    this.quantity = quantity
  }

  toString() {
    return JSON.stringify({
      id: this.id,
      client: {
        id: this.client.id,
        firstName: this.client.firstName,
        lastName: this.client.lastName
      },
      product: {
        id: this.product.id,
        name: this.product.name
      },
      quantity: this.quantity
    })
  }
}
