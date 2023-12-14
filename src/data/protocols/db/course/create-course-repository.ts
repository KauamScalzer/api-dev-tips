export interface ICreateCourseRepository {
  create (data: ICreateCourseRepository.Params): Promise<void>
}

export namespace ICreateCourseRepository {
  export type Params = {
    name: string
    description: string
    author: string
    thumb: string
  }
}
