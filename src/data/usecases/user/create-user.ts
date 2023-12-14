import { ICreateUser } from '@/domain/usecases/user'
import { Hasher } from '@/data/protocols/criptography'
import { ICreateUserRepository, IGetOneUserByEmailRepository } from '@/data/protocols/db/user'

export class CreateUser implements ICreateUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly createUserRepository: ICreateUserRepository,
    private readonly getOneUserByEmailRepository: IGetOneUserByEmailRepository
  ) {}

  async create (data: ICreateUserRepository.Params): Promise<ICreateUserRepository.Result> {
    const user = await this.getOneUserByEmailRepository.getOne(data.email)
    if (!user) {
      const hashedPassword = await this.hasher.hash(data.password)
      const result = await this.createUserRepository.create(Object.assign({}, data, { password: hashedPassword }))
      return result
    }
    return null
  }
}
