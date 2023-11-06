import { ICreateUserUsecase, CreateUserModel } from '@/domain/usecases/user'
import { UserModel } from '@/domain/models'
import { Hasher } from '@/data/protocols/criptography'
import { ICreateUserRepository, IGetOneUserByEmailRepository } from '@/data/protocols/user'

export class CreateUserUsecase implements ICreateUserUsecase {
  constructor (
    private readonly hasher: Hasher,
    private readonly createUserRepository: ICreateUserRepository,
    private readonly getOneUserByEmailRepository: IGetOneUserByEmailRepository
  ) {}

  async create (data: CreateUserModel): Promise<UserModel> {
    await this.getOneUserByEmailRepository.getOne(data.email)
    const hashedPassword = await this.hasher.hash(data.password)
    const result = await this.createUserRepository.create(Object.assign({}, data, { password: hashedPassword }))
    return result
  }
}
