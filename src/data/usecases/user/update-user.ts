import { IUpdateUser } from '@/domain/usecases/user'
import { IUpdateUserRepository } from '@/data/protocols/db/user'

export class UpdateUser implements IUpdateUser {
  constructor (
    private readonly updateUserRepository: IUpdateUserRepository
  ) {}

  async update (data: IUpdateUser.Params): Promise<void> {
    await this.updateUserRepository.update(data.id, data)
  }
}
