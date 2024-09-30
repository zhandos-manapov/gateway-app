import { Expose } from 'class-transformer'

export class ProductResponseDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly name: string

  toString() {
    return JSON.stringify({ id: this.id, name: this.name })
  }
}
