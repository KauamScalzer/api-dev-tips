export interface ICreateLessonRepository {
  create (data: ICreateLessonRepository.Params): Promise<ICreateLessonRepository.Result>
}

export namespace ICreateLessonRepository {
  export type Params = {
    courseId: number
    name: string
    description: string
    urlVideo: string
  }
  export type Result = {
    id: number
    courseId: number
    name: string
    description: string
    urlVideo: string
    createdAt: Date
    updatedAt: Date
  }
}
