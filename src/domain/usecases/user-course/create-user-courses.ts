export interface ICreateUserCourses {
  create (data: ICreateUserCourses.Params): Promise<void>
}

export namespace ICreateUserCourses {
  export type Params = {
    userId: number
    courseIds: [
      {
        id: number
      }
    ]
  }
}
