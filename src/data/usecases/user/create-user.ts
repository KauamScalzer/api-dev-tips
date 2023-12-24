import { ICreateUser } from '@/domain/usecases/user'
import { Hasher } from '@/data/protocols/criptography'
import { ICreateUserRepository } from '@/data/protocols/db/user'

export class CreateUser implements ICreateUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly createUserRepository: ICreateUserRepository
  ) {}

  async create (data: ICreateUserRepository.Params): Promise<ICreateUserRepository.Result> {
    const hashedPassword = await this.hasher.hash(data.password)
    const result = await this.createUserRepository.create(Object.assign({}, data, { password: hashedPassword }))
    return result
  }
}
