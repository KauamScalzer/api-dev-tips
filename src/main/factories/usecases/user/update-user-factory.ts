import { UpdateUser } from '@/data/usecases/user'
import { UpdateUserRepository } from '@/infra/db/repositories/user'
import { IUpdateUser } from '@/domain/usecases/user'

export const makeUpdateUser = (): IUpdateUser => {
  const updateUserRepository = new UpdateUserRepository()
  return new UpdateUser(updateUserRepository)
}
