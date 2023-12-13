import { IDeleteUserRepository } from '@/data/protocols/db/user'
import { User } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class DeleteUserRepository implements IDeleteUserRepository {
  async delete (data: number): Promise<void> {
    const repository = getRepository(User)
    await repository.delete(data)
  }
}
