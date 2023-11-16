export interface CreateCommentModel {
  lessonId: number
  userId: string
  comment: string
}

export interface ICreateComment {
  create (data: CreateCommentModel): Promise<void>
}
