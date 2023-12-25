import { ICreateUser, IUserAuthentication } from '@/domain/usecases/user'
import { Hasher } from '@/data/protocols/criptography'
import { ICreateUserRepository } from '@/data/protocols/db/user'

export class CreateUser implements ICreateUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly createUserRepository: ICreateUserRepository,
    private readonly userAuthentication: IUserAuthentication
  ) {}

  async create (data: ICreateUserRepository.Params): Promise<string> {
    const hashedPassword = await this.hasher.hash(data.password)
    await this.createUserRepository.create(Object.assign({}, data, { password: hashedPassword }))
    const token = await this.userAuthentication.auth({ email: data.email, password: data.password })
    return token
  }
}
