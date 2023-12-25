export interface IGetOneCourseRepository {
  getOne (id: number): Promise<IGetOneCourseRepository.Result>
}

export namespace IGetOneCourseRepository {
  export type Result = {
    id: number
    name: string
    description: string
    author: string
    thumb: string
    createdAt: Date
    updatedAt: Date
  }
}
