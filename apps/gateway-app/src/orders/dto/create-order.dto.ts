import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateOrderDto {
  @ApiProperty({ format: 'uuid' })
  @IsNotEmpty()
  @IsString()
  readonly clientId: string

  @ApiProperty({ format: 'uuid' })
  @IsNotEmpty()
  @IsString()
  readonly productId: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number
}
