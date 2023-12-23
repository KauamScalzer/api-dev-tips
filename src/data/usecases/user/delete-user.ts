import { IDeleteUser } from '@/domain/usecases/user'
import { IDeleteUserRepository } from '@/data/protocols/db/user'

export class DeleteUser implements IDeleteUser {
  constructor (
    private readonly deleteUserRepository: IDeleteUserRepository
  ) {}

  async delete (data: IDeleteUser.Params): Promise<void> {
    await this.deleteUserRepository.delete(data.id)
  }
}
