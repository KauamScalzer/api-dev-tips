import { IGetOneUser } from '@/domain/usecases/user'
import { IGetOneUserRepository } from '@/data/protocols/user'

export class GetOneUser implements IGetOneUser {
  constructor (
    private readonly getOneUserRepository: IGetOneUserRepository
  ) {}

  async getOne (data: number): Promise<any> {
    return await this.getOneUserRepository.getOne(data)
  }
}
