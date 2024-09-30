import { Test, TestingModule } from '@nestjs/testing'
import { OrderStatesController } from './order-states.controller'

describe('OrderStatesController', () => {
  let controller: OrderStatesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderStatesController]
    }).compile()

    controller = module.get<OrderStatesController>(OrderStatesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
