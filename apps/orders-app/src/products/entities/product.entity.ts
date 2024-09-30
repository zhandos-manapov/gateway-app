import { Column, Entity } from 'typeorm'
import { AbstractEntity } from '../../common'

@Entity()
export class ProductEntity extends AbstractEntity {
  @Column()
  name: string
}
