import { UserModel } from '@/domain/models'

export interface IGetOneUserRepository {
  getOne (id: number): Promise<UserModel>
}
