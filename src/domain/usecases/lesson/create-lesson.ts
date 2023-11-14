export interface CreateLessonModel {
  courseId: number
  name: string
  description: string
  urlVideo: string
}

export interface ICreateLesson {
  create (data: CreateLessonModel): Promise<void>
}
