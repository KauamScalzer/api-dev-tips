export interface IGetAllCommentsByLesson {
  getAll (data: IGetAllCommentsByLesson.Params): Promise<any>
}

export namespace IGetAllCommentsByLesson {
  export type Params = {
    lessonId: number
  }
}
