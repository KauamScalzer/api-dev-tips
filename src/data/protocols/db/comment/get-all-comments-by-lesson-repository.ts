export interface IGetAllCommentsByLessonRepository {
  getAll (data: IGetAllCommentsByLessonRepository.Params): Promise<any>
}

export namespace IGetAllCommentsByLessonRepository {
  export type Params = {
    lessonId: number
    take: number
    skip: number
  }
}
