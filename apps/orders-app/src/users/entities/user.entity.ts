import { Column, Entity } from 'typeorm'
import { AbstractEntity } from '../../common'

@Entity()
export class UserEntity extends AbstractEntity {
  @Column()
  firstName: string

  @Column()
  lastName: string
}
