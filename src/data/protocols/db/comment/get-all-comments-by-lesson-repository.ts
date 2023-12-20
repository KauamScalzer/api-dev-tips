export interface IGetAllCommentsByLessonRepository {
  getAll (data: IGetAllCommentsByLessonRepository.Params): Promise<any>
}

export namespace IGetAllCommentsByLessonRepository {
  export type Params = {
    lessonId: number
    take: number
    skip: number
  }
  export type Result = {
    count: number
    data: [{
      id: number
      userId: number
      lessonId: number
      comment: string
      createdAt: Date
      updatedAt: Date
    }]
  }
}
