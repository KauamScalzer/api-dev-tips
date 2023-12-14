import { HashComparer, Encrypter } from '@/data/protocols/criptography'
import { IGetOneUserByEmailRepository, IUpdateUserRepository } from '@/data/protocols/db/user'
import { IUserAuthentication } from '@/domain/usecases/user'

export class UserAuthentication implements IUserAuthentication {
  constructor (
    private readonly getOneUserByEmailRepository: IGetOneUserByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateUserRepository: IUpdateUserRepository
  ) {}

  async auth (data: IUserAuthentication.Params): Promise<string> {
    const user = await this.getOneUserByEmailRepository.getOne(data.email)
    if (user) {
      const isValid = await this.hashComparer.compare(data.password, user.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(user.id.toString())
        await this.updateUserRepository.update(user.id, { accessToken })
        return accessToken
      }
    }
    return null
  }
}
