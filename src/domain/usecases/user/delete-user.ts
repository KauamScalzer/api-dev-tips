export interface IDeleteUser {
  delete (data: IDeleteUser.Params): Promise<void>
}

export namespace IDeleteUser {
  export type Params = {
    id: number
  }
}
