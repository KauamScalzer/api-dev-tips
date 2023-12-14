export interface ICreateComment {
  create (data: ICreateComment.Params): Promise<void>
}

export namespace ICreateComment {
  export type Params = {
    lessonId: number
    userId: number
    comment: string
  }
}
