export interface ICreateCommentRepository {
  create (data: ICreateCommentRepository.Params): Promise<void>
}

export namespace ICreateCommentRepository {
  export type Params = {
    userId: number
    lessonId: number
    comment: string
  }
}
