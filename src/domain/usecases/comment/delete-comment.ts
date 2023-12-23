export interface IDeleteComment {
  delete (id: IDeleteComment.Params): Promise<void>
}

export namespace IDeleteComment {
  export type Params = {
    id: number
  }
}
