export interface IUpdateLessonRepository {
  update (id: number, data: IUpdateLessonRepository.Params): Promise<void>
}

export namespace IUpdateLessonRepository {
  export type Params = {
    courseId: number
    name: string
    description: string
    urlVideo: string
  }
}
