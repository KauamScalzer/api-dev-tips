import { ICreateUserCourses } from '@/domain/usecases/user-course'
import { returnErrorDecider, created, serverError } from '@/presentation/helpers'
import { HttpResponse, Controller, Validation } from '@/presentation/protocols'

export class CreateUserCoursesController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createUserCourses: ICreateUserCourses
  ) {}

  async handle (httpRequest: CreateUserCoursesController.Params): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest)
      if (error) {
        return returnErrorDecider(error)
      }
      await this.createUserCourses.create({
        userId: httpRequest.userId,
        courseIds: httpRequest.courseIds
      })
      return created('')
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace CreateUserCoursesController {
  export type Params = {
    userId: number
    courseIds: [{
      id: number
    }]
  }
}
