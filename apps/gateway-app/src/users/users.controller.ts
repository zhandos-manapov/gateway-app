import { Observable } from 'rxjs'

import { USERS_PATTERNS } from '@app/contracts/orders-app'
import { Body, Controller, Get, Inject, OnModuleInit, Post } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { ORDERS_SERVICE } from '../clients/constants'
import { CreateUserDto, UserResponseDto } from './dto'
import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController implements OnModuleInit {
  constructor(
    @Inject(ORDERS_SERVICE) private readonly ordersClient: ClientKafka,
    private readonly usersService: UsersService
  ) {}

  onModuleInit() {
    Object.values(USERS_PATTERNS).forEach((topic) => this.ordersClient.subscribeToResponseOf(topic))
  }

  @Post()
  @ApiResponse({ type: UserResponseDto })
  create(@Body() createUserDto: CreateUserDto): Observable<UserResponseDto> {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @ApiResponse({ type: [UserResponseDto] })
  findAll(): Observable<UserResponseDto[]> {
    return this.usersService.findAll()
  }
}
