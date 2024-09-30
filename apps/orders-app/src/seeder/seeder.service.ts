import { Injectable } from '@nestjs/common'

import { OrdersService } from '../orders/orders.service'
import { ProductEntity } from '../products/entities'
import { ProductsService } from '../products/products.service'
import { UserEntity } from '../users/entities'
import { UsersService } from '../users/users.service'

const userPayload = {
  firstName: 'Zhandos',
  lastName: 'Manapov'
}

const productPayload = {
  name: 'macbook air'
}

@Injectable()
export class SeederService {
  constructor(
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService
  ) {}

  async seed() {
    const user = await this.seedUser()
    const product = await this.seedProduct()
    await this.seedOrder(user, product, 1)
  }

  private async seedUser() {
    const userExists = await this.usersService.findOneByFirstNameAndLastName(
      userPayload.firstName,
      userPayload.lastName
    )

    if (!userExists) {
      return await this.usersService.create(userPayload)
    } else {
      return userExists
    }
  }

  private async seedProduct() {
    const productExists = await this.productsService.findOneByName(productPayload.name)

    if (!productExists) {
      return await this.productsService.create(productPayload)
    } else {
      return productExists
    }
  }

  private async seedOrder(client: UserEntity, product: ProductEntity, quantity: number) {
    const order = this.ordersService.getEntity({ client, product, quantity })
    await this.ordersService.saveEntity(order)
  }
}
