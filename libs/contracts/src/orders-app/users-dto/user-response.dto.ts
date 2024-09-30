import { Expose } from 'class-transformer'

export class UserResponseDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly firstName: string

  @Expose()
  readonly lastName: string

  toString() {
    return JSON.stringify({ id: this.id, firstName: this.firstName, lastName: this.lastName })
  }
}
