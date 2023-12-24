import { CreateUser } from '@/data/usecases/user'
import { HashBcryptAdapter } from '@/infra/criptography/bcrypt'
import { CreateUserRepository } from '@/infra/db/repositories/user'
import { ICreateUser } from '@/domain/usecases/user'

export const makeCreateUser = (): ICreateUser => {
  const salt = 12
  const createUserRepository = new CreateUserRepository()
  const hashBcryptAdapter = new HashBcryptAdapter(salt)
  return new CreateUser(hashBcryptAdapter, createUserRepository)
}
