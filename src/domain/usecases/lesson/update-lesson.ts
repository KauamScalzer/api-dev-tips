export interface IUpdateLesson {
  update (data: IUpdateLesson.Params): Promise<void>
}

export namespace IUpdateLesson {
  export type Params = {
    id: number
    courseId: number
    name: string
    description: string
    urlVideo: string
  }
}
