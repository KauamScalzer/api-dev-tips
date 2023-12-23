export interface IGetAllLessonByCourse {
  getAll (data: IGetAllLessonByCourse.Params): Promise<any>
}

export namespace IGetAllLessonByCourse {
  export type Params = {
    courseId: number
  }
}
