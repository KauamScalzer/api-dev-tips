export interface ICreateLessonRepository {
  create (data: CreateLessonParams): Promise<void>
}

export interface CreateLessonParams {
  courseId: number
  name: string
  description: string
  urlVideo: string
}
