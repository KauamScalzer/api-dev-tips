export interface ICreateCommentRepository {
  create (data: ICreateCommentRepository.Params): Promise<ICreateCommentRepository.Result>
}

export namespace ICreateCommentRepository {
  export type Params = {
    userId: number
    lessonId: number
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
