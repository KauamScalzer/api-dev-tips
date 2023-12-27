export interface ICreateUser {
  create (data: ICreateUser.Params): Promise<string>
}

export namespace ICreateUser {
  export type Params = {
    name: string
    email: string
    password: string
  }
}
