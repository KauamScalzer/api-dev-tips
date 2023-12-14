import { IGetOneUserByEmailRepository } from '@/data/protocols/db/user'
import { User } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class GetOneUserByEmailRepository implements IGetOneUserByEmailRepository {
  async getOne (email: string): Promise<IGetOneUserByEmailRepository.Result> {
    const repository = getRepository(User)
    const result = await repository.findOne({ where: { email: email } })
    return result
  }
}
