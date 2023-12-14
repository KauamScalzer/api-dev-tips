import { UserAuthentication } from '@/data/usecases/user'
import { GetOneUserByEmailRepository, UpdateUserRepository } from '@/infra/db/repositories/user'
import { HashComparerBcryptAdapter } from '@/infra/criptography/bcrypt'
import { EncrypterJwtAdapter } from '@/infra/criptography/jwt'
import { IUserAuthentication } from '@/domain/usecases/user'

export const makeUserAuthentication = (): IUserAuthentication => {
  const getOneUserByEmailRepository = new GetOneUserByEmailRepository()
  const hashComparerBcryptAdapter = new HashComparerBcryptAdapter()
  const encrypterJwtAdapter = new EncrypterJwtAdapter('1')
  const updateUserRepository = new UpdateUserRepository()
  return new UserAuthentication(getOneUserByEmailRepository, hashComparerBcryptAdapter, encrypterJwtAdapter, updateUserRepository)
}
