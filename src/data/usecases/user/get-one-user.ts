import { IGetOneUser } from '@/domain/usecases/user'
import { IGetOneUserRepository } from '@/data/protocols/db/user'

export class GetOneUser implements IGetOneUser {
  constructor (
    private readonly getOneUserRepository: IGetOneUserRepository
  ) {}

  async getOne (data: IGetOneUser.Params): Promise<IGetOneUser.Result> {
    return await this.getOneUserRepository.getOne(data.id)
  }
}
