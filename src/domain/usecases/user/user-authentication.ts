export interface IUserAuthentication {
  auth (data: IUserAuthentication.Params): Promise<string>
}

export namespace IUserAuthentication {
  export type Params = {
    email: string
    password: string
  }
}
