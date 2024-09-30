import { Test, TestingModule } from '@nestjs/testing'
import { StatesAppController } from './states-app.controller'
import { StatesAppService } from './states-app.service'

describe('StatesAppController', () => {
  let statesAppController: StatesAppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StatesAppController],
      providers: [StatesAppService]
    }).compile()

    statesAppController = app.get<StatesAppController>(StatesAppController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(statesAppController.getHello()).toBe('Hello World!')
    })
  })
})
