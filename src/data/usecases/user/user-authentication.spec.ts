import { UserAuthentication } from './user-authentication'
import { IGetOneUserByEmailRepository, IUpdateUserRepository } from '@/data/protocols/db/user'
import { HashComparer, Encrypter } from '@/data/protocols/criptography'
import { IUserAuthentication } from '@/domain/usecases/user'

const makeGetOneUserByEmailRepository = (): IGetOneUserByEmailRepository => {
  class GetOneUserByEmailRepositoryStub implements IGetOneUserByEmailRepository {
    async getOne (data: string): Promise<IGetOneUserByEmailRepository.Result> {
      const fakeUser: IGetOneUserByEmailRepository.Result = {
        id: 1,
        name: 'any_name',
        email: 'any_email',
        password: 'hashed_password'
      }
      return await new Promise(resolve => resolve(fakeUser))
    }
  }
  return new GetOneUserByEmailRepositoryStub()
}

const makeHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }
  return new HashComparerStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }
  return new EncrypterStub()
}

const makeUpdateUserRepository = (): IUpdateUserRepository => {
  class UpdateUserRepositoryStub implements IUpdateUserRepository {
    async update (id: number, data: IUpdateUserRepository.Params): Promise<void> {}
  }
  return new UpdateUserRepositoryStub()
}

interface SutTypes {
  sut: UserAuthentication
  getOneUserByEmailRepositoryStub: IGetOneUserByEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
  updateUserRepositoryStub: IUpdateUserRepository
}

const makeSut = (): SutTypes => {
  const getOneUserByEmailRepositoryStub = makeGetOneUserByEmailRepository()
  const hashComparerStub = makeHashComparer()
  const encrypterStub = makeEncrypter()
  const updateUserRepositoryStub = makeUpdateUserRepository()
  const sut = new UserAuthentication(getOneUserByEmailRepositoryStub, hashComparerStub, encrypterStub, updateUserRepositoryStub)
  return {
    sut,
    getOneUserByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateUserRepositoryStub
  }
}

const makeFakeAuthenticationData = (): IUserAuthentication.Params => ({
  email: 'valid_email',
  password: 'valid_password'
})

describe('UserAuthentication usecase', () => {
  test('Should call IGetOneUserByEmailRepository with correct email', async () => {
    const { sut, getOneUserByEmailRepositoryStub } = makeSut()
    const getOneSpy = jest.spyOn(getOneUserByEmailRepositoryStub, 'getOne')
    await sut.auth(makeFakeAuthenticationData())
    expect(getOneSpy).toHaveBeenCalledWith('valid_email')
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(makeFakeAuthenticationData())
    expect(compareSpy).toHaveBeenCalledWith('valid_password', 'hashed_password')
  })

  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const generateSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(makeFakeAuthenticationData())
    expect(generateSpy).toHaveBeenCalledWith('1')
  })

  test('Should call IUpdateUserRepository with correct values', async () => {
    const { sut, updateUserRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateUserRepositoryStub, 'update')
    await sut.auth(makeFakeAuthenticationData())
    expect(updateSpy).toHaveBeenCalledWith(1, { accessToken: 'any_token' })
  })

  test('Should throw if IGetOneUserByEmailRepository throws', async () => {
    const { sut, getOneUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(getOneUserByEmailRepositoryStub, 'getOne').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthenticationData())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthenticationData())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthenticationData())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if IUpdateUserRepository throws', async () => {
    const { sut, updateUserRepositoryStub } = makeSut()
    jest.spyOn(updateUserRepositoryStub, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthenticationData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if GetOneUserByEmailRepository returns null', async () => {
    const { sut, getOneUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(getOneUserByEmailRepositoryStub, 'getOne').mockResolvedValueOnce(null)
    const result = await sut.auth(makeFakeAuthenticationData())
    expect(result).toBeFalsy()
  })

  test('Should return null if HashComparer returns null', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockResolvedValueOnce(null)
    const result = await sut.auth(makeFakeAuthenticationData())
    expect(result).toBeFalsy()
  })

  test('Should return an acessToken on sucess', async () => {
    const { sut } = makeSut()
    const result = await sut.auth(makeFakeAuthenticationData())
    expect(result).toBe('any_token')
  })
})
