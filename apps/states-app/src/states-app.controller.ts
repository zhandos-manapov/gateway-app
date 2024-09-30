import { Controller, Get } from '@nestjs/common'
import { StatesAppService } from './states-app.service'

@Controller()
export class StatesAppController {
  constructor(private readonly statesAppService: StatesAppService) {}

  @Get()
  getHello(): string {
    return this.statesAppService.getHello()
  }
}
