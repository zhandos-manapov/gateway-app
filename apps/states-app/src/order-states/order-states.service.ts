import { DataSource } from 'typeorm'

import { Injectable } from '@nestjs/common'

enum OrderStatuses {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted'
}

@Injectable()
export class OrderStatesService {
  constructor(private readonly dataSource: DataSource) {}

  handleOrderCreated(id: string) {
    this.setOrderStatus(id, OrderStatuses.CREATED)
  }

  handleOrderUpdated(id: string) {
    this.setOrderStatus(id, OrderStatuses.UPDATED)
  }

  private setOrderStatus(id: string, status: OrderStatuses) {
    this.dataSource
      .createQueryBuilder()
      .update('order_entity')
      .set({ status })
      .where('id = :id', { id })
      .execute()
  }

  handleOrderDeleted(message: string) {
    console.log(message)
  }
}
