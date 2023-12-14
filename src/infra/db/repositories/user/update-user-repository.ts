import { IUpdateUserRepository } from '@/data/protocols/db/user'
import { User } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class UpdateUserRepository implements IUpdateUserRepository {
  async update (id: number, data: IUpdateUserRepository.Params): Promise<void> {
    const entity = new User()
    Object.assign(entity, data)
    const repository = getRepository(User)
    await repository.update(id, entity)
  }
}
