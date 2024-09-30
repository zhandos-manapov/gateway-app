import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class ProductResponseDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  readonly id: string

  @Expose()
  @ApiProperty()
  readonly name: string
}
