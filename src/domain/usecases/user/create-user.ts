export interface ICreateUser {
  create (data: ICreateUser.Params): Promise<ICreateUser.Result>
}

export namespace ICreateUser {
  export type Params = {
    name: string
    email: string
    password: string
    urlImage: string
  }
  export type Result = {
    id: number
    name: string
    email: string
    password: string
    urlImage: string
  }
}
