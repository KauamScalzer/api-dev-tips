export interface ICreateLesson {
  create (data: ICreateLesson.Params): Promise<void>
}

export namespace ICreateLesson {
  export type Params = {
    courseId: number
    name: string
    description: string
    urlVideo: string
  }
}
