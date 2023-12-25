export interface IGetAllCommentsByLesson {
  getAll (data: IGetAllCommentsByLesson.Params): Promise<IGetAllCommentsByLesson.Result>
}

export namespace IGetAllCommentsByLesson {
  export type Params = {
    lessonId: number
    skip: number
    take: number
  }
  export type Result = {
    result: Array<{
      id: number
      userId: number
      lessonId: number
      comment: string
      createdAt: Date
      updatedAt: Date
    }>
    count: number
  }
}
