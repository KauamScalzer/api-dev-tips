export interface ICreateLessonRepository {
  create (data: ICreateLessonRepository.Params): Promise<void>
}

export namespace ICreateLessonRepository {
  export type Params = {
    courseId: number
    name: string
    description: string
    urlVideo: string
  }
}
