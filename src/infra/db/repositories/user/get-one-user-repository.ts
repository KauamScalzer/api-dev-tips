import { UserModel } from '@/domain/models'
import { IGetOneUserRepository } from '@/data/protocols/user'
import { User } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class GetOneUserRepository implements IGetOneUserRepository {
  async getOne (data: number): Promise<UserModel> {
    const repository = getRepository(User)
    const result = await repository.findOne({ where: { id: data } })
    return result
  }
}
