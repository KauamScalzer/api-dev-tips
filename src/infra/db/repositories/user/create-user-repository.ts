import { ICreateUserRepository } from '@/data/protocols/db/user'
import { UserModel } from '@/domain/models'
import { CreateUserModel } from '@/domain/usecases/user'
import { User } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class CreateUserRepository implements ICreateUserRepository {
  async create (data: CreateUserModel): Promise<UserModel> {
    const entity = new User()
    Object.assign(entity, data)
    const repository = getRepository(User)
    const result = await repository.save(entity)
    return result
  }
}
