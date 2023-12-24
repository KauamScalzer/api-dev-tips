export interface IGetAllLessonByCourseRepository {
  getAll (data: IGetAllLessonByCourseRepository.Params): Promise<IGetAllLessonByCourseRepository.Result>
}

export namespace IGetAllLessonByCourseRepository {
  export type Params = {
    courseId: number
    skip: number
    take: number
  }
  export type Result = any
}
