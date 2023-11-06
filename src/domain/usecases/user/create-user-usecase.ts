import { UserModel } from '@/domain/models'

export interface CreateUserModel {
  name: string
  email: string
  password: string
  urlImage: string
}

export interface ICreateUserUsecase {
  create (data: CreateUserModel): Promise<UserModel>
}
