export interface IGetAllCommentsByLessonRepository {
  getAll (data: IGetAllCommentsByLessonRepository.Params): Promise<IGetAllCommentsByLessonRepository.Result>
}

export namespace IGetAllCommentsByLessonRepository {
  export type Params = {
    lessonId: number
    take: number
    skip: number
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
