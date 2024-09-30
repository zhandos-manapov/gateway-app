import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string
}
