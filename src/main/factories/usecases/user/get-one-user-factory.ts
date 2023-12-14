import { GetOneUser } from '@/data/usecases/user'
import { IGetOneUser } from '@/domain/usecases/user'
import { GetOneUserRepository } from '@/infra/db/repositories/user'

export const makeGetOneUser = (): IGetOneUser => {
  const getOneUserRepository = new GetOneUserRepository()
  return new GetOneUser(getOneUserRepository)
}
