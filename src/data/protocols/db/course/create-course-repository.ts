export interface ICreateCourseRepository {
  create (data: ICreateCourseRepository.Params): Promise<ICreateCourseRepository.Result>
}

export namespace ICreateCourseRepository {
  export type Params = {
    name: string
    description: string
    author: string
    thumb: string
  }
  export type Result = {
    id: number
    name: string
    description: string
    thumb: string
    author: string
    createdAt: Date
    updatedAt: Date
  }
}
