import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class DeleteResponseDto {
  @Expose()
  @ApiProperty()
  affected: number

  @Expose()
  @ApiProperty()
  success: boolean

  @Expose()
  @ApiProperty()
  message: string
}
