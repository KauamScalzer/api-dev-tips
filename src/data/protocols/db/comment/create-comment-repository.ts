export interface ICreateCommentRepository {
  create (data: CreateCommentParams): Promise<void>
}

export interface CreateCommentParams {
  lessonId: number
  userId: number
  comment: string
}
