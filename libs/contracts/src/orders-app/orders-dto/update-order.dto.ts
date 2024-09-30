import { CreateOrderDto } from './create-order.dto'

export class UpdateOrderDto extends CreateOrderDto {
  readonly id: string
}
