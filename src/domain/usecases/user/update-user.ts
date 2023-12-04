export interface UpdateUserModel {
  name: string
  email: string
  urlImage: string
}

export interface IUpdateUser {
  update (data: UpdateUserModel): Promise<void>
}
