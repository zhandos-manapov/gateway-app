import { Expose } from 'class-transformer'
import { UserResponseDto } from '../../users/dto'
import { ProductResponseDto } from '../../products/dto'
import { ApiProperty } from '@nestjs/swagger'

export class OrderResponseDto {
  @Expose()
  @ApiProperty()
  readonly client: UserResponseDto

  @Expose()
  @ApiProperty()
  readonly product: ProductResponseDto

  @Expose()
  @ApiProperty()
  readonly quantity: number
}
