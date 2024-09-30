import { Injectable } from '@nestjs/common'

@Injectable()
export class StatesAppService {
  getHello(): string {
    return 'Hello World!'
  }
}
