import { Inject, Injectable } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'

import { ORDERS_SERVICE } from '../clients/constants'
import { CreateUserDto } from './dto/create-user.dto'
import {
  CreateUserDto as ClientCreateUserDto,
  UserResponseDto,
  USERS_PATTERNS
} from '@app/contracts/orders-app'

@Injectable()
export class UsersService {
  constructor(@Inject(ORDERS_SERVICE) private readonly ordersClient: ClientKafka) {}

  create(createUserDto: CreateUserDto) {
    return this.ordersClient.send<UserResponseDto, ClientCreateUserDto>(
      USERS_PATTERNS.CREATE,
      createUserDto
    )
  }

  findAll() {
    return this.ordersClient.send<UserResponseDto[]>(USERS_PATTERNS.FIND_ALL, {})
  }
}
