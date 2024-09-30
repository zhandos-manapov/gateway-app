import { Injectable } from '@nestjs/common'

@Injectable()
export class OrdersAppService {
  getHello(): string {
    return 'Hello World!'
  }
}
