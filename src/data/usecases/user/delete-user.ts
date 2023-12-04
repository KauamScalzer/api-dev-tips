import { IDeleteUser } from '@/domain/usecases/user'
import { IDeleteUserRepository } from '@/data/protocols/user'

export class DeleteUser implements IDeleteUser {
  constructor (
    private readonly deleteUserRepository: IDeleteUserRepository
  ) {}

  async delete (data: number): Promise<void> {
    await this.deleteUserRepository.delete(data)
  }
}
