import { Column, Entity, ManyToOne } from 'typeorm'
import { AbstractEntity } from '../../common'
import { UserEntity } from '../../users/entities'
import { ProductEntity } from '../../products/entities'

@Entity()
export class OrderEntity extends AbstractEntity {
  @ManyToOne(() => UserEntity)
  client: UserEntity

  @ManyToOne(() => ProductEntity)
  product: ProductEntity

  @Column()
  quantity: number

  @Column({ nullable: true })
  status: string
}
