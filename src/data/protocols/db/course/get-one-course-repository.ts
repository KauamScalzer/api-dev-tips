export interface IGetOneCourseRepository {
  getOne (id: number): Promise<IGetOneCourseRepository.Result>
}

export namespace IGetOneCourseRepository {
  export type Result = any
}
