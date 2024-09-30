import { plainToInstance } from 'class-transformer'

import { CreateUserDto, UserResponseDto, USERS_PATTERNS } from '@app/contracts/orders-app'
import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { UsersService } from './users.service'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USERS_PATTERNS.CREATE)
  async create(@Payload() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto)
    return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true })
  }

  @MessagePattern(USERS_PATTERNS.FIND_ALL)
  async findAll() {
    const users = await this.usersService.findAll()
    return plainToInstance(UserResponseDto, users, { excludeExtraneousValues: true })
  }
}
