import { Test, TestingModule } from '@nestjs/testing'
import { OrderStatesService } from './order-states.service'

describe('OrderStatesService', () => {
  let service: OrderStatesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderStatesService]
    }).compile()

    service = module.get<OrderStatesService>(OrderStatesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
