import { Test, TestingModule } from '@nestjs/testing'
import { OrdersAppController } from './orders-app.controller'
import { OrdersAppService } from './orders-app.service'

describe('OrdersAppController', () => {
  let ordersAppController: OrdersAppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersAppController],
      providers: [OrdersAppService]
    }).compile()

    ordersAppController = app.get<OrdersAppController>(OrdersAppController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ordersAppController.getHello()).toBe('Hello World!')
    })
  })
})
