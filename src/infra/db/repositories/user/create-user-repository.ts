import { ICreateUserRepository } from '@/data/protocols/db/user'
import { User } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class CreateUserRepository implements ICreateUserRepository {
  async create (data: ICreateUserRepository.Params): Promise<ICreateUserRepository.Result> {
    const entity = new User()
    Object.assign(entity, data)
    const repository = getRepository(User)
    const result = await repository.save(entity)
    delete result.password
    return result
  }
}
