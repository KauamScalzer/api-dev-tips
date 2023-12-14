import { DeleteUser } from '@/data/usecases/user'
import { DeleteUserRepository } from '@/infra/db/repositories/user'
import { IDeleteUser } from '@/domain/usecases/user'

export const makeDeleteUser = (): IDeleteUser => {
  const deleteUserRepository = new DeleteUserRepository()
  return new DeleteUser(deleteUserRepository)
}
