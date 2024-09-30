import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities'
import { Repository } from 'typeorm'
import { CreateUserDto } from '@app/contracts/orders-app'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {}

  findOne(id: string) {
    return this.userRepository.findOneBy({ id })
  }

  findAll() {
    return this.userRepository.find()
  }

  async create(createUserDto: CreateUserDto) {
    const userEntity = this.userRepository.create(createUserDto)
    return await this.userRepository.save(userEntity)
  }
}
