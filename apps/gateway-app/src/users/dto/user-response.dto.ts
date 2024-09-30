import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class UserResponseDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  readonly id: string

  @Expose()
  @ApiProperty()
  readonly firstName: string

  @Expose()
  @ApiProperty()
  readonly lastName: string
}
