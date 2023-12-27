export interface ICreateLesson {
  create (data: ICreateLesson.Params): Promise<ICreateLesson.Result>
}

export namespace ICreateLesson {
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
