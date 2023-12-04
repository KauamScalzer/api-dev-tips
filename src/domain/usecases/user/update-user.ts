export interface UpdateUserModel {
  id: number
  name: string
  email: string
  urlImage: string
}

export interface IUpdateUser {
  update (data: UpdateUserModel): Promise<void>
}
