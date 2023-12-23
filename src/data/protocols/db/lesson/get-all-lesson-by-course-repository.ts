export interface IGetAllLessonByCourseRepository {
  getAll (id: number, data: IGetAllLessonByCourseRepository.Params): Promise<IGetAllLessonByCourseRepository.Result>
}

export namespace IGetAllLessonByCourseRepository {
  export type Params = {
    skip: number
    take: number
  }
  export type Result = any
}
