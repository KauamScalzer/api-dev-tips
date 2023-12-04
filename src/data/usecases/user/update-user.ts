import { IUpdateUser, UpdateUserModel } from '@/domain/usecases/user'
import { IUpdateUserRepository } from '@/data/protocols/user'

export class UpdateUser implements IUpdateUser {
  constructor (
    private readonly updateUserRepository: IUpdateUserRepository
  ) {}

  async update (data: UpdateUserModel): Promise<void> {
    await this.updateUserRepository.update(data.id, data)
  }
}
