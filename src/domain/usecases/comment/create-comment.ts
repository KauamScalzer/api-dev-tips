export interface CreateCommentModel {
  lessonId: number
  userId: number
  comment: string
}

export interface ICreateComment {
  create (data: CreateCommentModel): Promise<void>
}
