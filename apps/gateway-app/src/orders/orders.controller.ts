import { Observable, tap } from 'rxjs'

import { ORDERS_PATTERNS } from '@app/contracts/orders-app'
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  ParseUUIDPipe,
  Post,
  Put
} from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { ORDERS_SERVICE, STATES_SERVICE } from '../clients/constants'
import { CreateOrderDto, UpdateOrderDto } from './dto'
import { OrderResponseDto } from './dto/order-response.dto'
import { OrdersService } from './orders.service'
import { DeleteResponseDto } from '../common/dto'
import { ORDER_STATES_PATTERNS } from '@app/contracts/states-app'

import { OrderResponseDto as ClientOrderResponseDto } from '@app/contracts/orders-app'

@ApiTags('orders')
@Controller('orders')
export class OrdersController implements OnModuleInit {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject(ORDERS_SERVICE) private readonly ordersClient: ClientKafka,
    @Inject(STATES_SERVICE) private readonly statesClient: ClientKafka
  ) {}

  onModuleInit() {
    Object.values(ORDERS_PATTERNS).forEach((topic) =>
      this.ordersClient.subscribeToResponseOf(topic)
    )
  }

  @Post()
  @ApiResponse({ type: OrderResponseDto })
  create(@Body() createOrderDto: CreateOrderDto): Observable<OrderResponseDto> {
    return this.ordersService.create(createOrderDto).pipe(
      tap((orderResponse: ClientOrderResponseDto) => {
        this.statesClient.emit(ORDER_STATES_PATTERNS.CREATED, orderResponse.id)
      })
    )
  }

  @Get()
  @ApiResponse({ type: [OrderResponseDto] })
  findAll(): Observable<OrderResponseDto[]> {
    return this.ordersService.findAll()
  }

  @Get(':id')
  @ApiResponse({ type: OrderResponseDto })
  findOne(@Param('id', ParseUUIDPipe) id: string): Observable<OrderResponseDto> {
    return this.ordersService.findOne(id)
  }

  @Put(':id')
  @ApiResponse({ type: OrderResponseDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto
  ): Observable<OrderResponseDto> {
    return this.ordersService.update(id, updateOrderDto).pipe(
      tap((orderResponse: ClientOrderResponseDto) => {
        this.statesClient.emit(ORDER_STATES_PATTERNS.UPDATED, orderResponse.id)
      })
    )
  }

  @Delete(':id')
  @ApiResponse({ type: DeleteResponseDto })
  remove(@Param('id') id: string): Observable<DeleteResponseDto> {
    return this.ordersService.remove(id).pipe(
      tap((result) => {
        this.statesClient.emit(ORDER_STATES_PATTERNS.DELETED, result.message)
      })
    )
  }
}
