export interface IUpdateComment {
  update (data: IUpdateComment.Params): Promise<void>
}

export namespace IUpdateComment {
  export type Params = {
    id: number
    comment: string
  }
}
