import { IGetOneUserRepository } from '@/data/protocols/db/user'
import { User } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class GetOneUserRepository implements IGetOneUserRepository {
  async getOne (data: number): Promise<IGetOneUserRepository.Result> {
    const repository = getRepository(User)
    const result = await repository.findOne({ where: { id: data } })
    if (result) {
      delete result.accessToken
      delete result.password
      return result
    }
  }
}
