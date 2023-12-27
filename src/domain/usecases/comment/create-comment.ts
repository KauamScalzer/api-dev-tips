export interface ICreateComment {
  create (data: ICreateComment.Params): Promise<ICreateComment.Result>
}

export namespace ICreateComment {
  export type Params = {
    lessonId: number
    userId: number
    comment: string
  }
  export type Result = {
    id: number
    lessonId: number
    userId: number
    comment: string
    createdAt: Date
    updatedAt: Date
  }
}
