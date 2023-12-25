export interface IGetAllLessonByCourse {
  getAll (data: IGetAllLessonByCourse.Params): Promise<IGetAllLessonByCourse.Result>
}

export namespace IGetAllLessonByCourse {
  export type Params = {
    courseId: number
    skip: number
    take: number
  }
  export type Result = {
    result: Array<{
      id: number
      courseId: number
      name: string
      description: string
      urlVideo: string
      createdAt: Date
      updatedAt: Date
    }>
    count: number
  }
}
