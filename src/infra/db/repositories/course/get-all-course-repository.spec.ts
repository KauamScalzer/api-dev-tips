import { TypeormHelper } from '@/infra/db/helpers'
import { GetAllCourseRepository } from './get-all-course-repository'
import { getRepository } from 'typeorm'

const makeSut = (): GetAllCourseRepository => {
  return new GetAllCourseRepository()
}

describe('GetAllCourseRepository', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  afterEach(async () => {
    await TypeormHelper.clear('course')
  })

  afterAll(async () => {
    await TypeormHelper.desconnect()
  })

  test('Should return an course on sucess', async () => {
    const sut = makeSut()
    await getRepository('course').save({
      id: 1,
      name: 'any_name',
      description: 'any_description',
      author: 'any_author',
      thumb: 'any_thumb'
    })
    const course = await sut.getAll()
    expect(course[0].id).toBeTruthy()
    expect(course[0].name).toBe('any_name')
    expect(course[0].description).toBe('any_description')
    expect(course[0].author).toBe('any_author')
    expect(course[0].thumb).toBe('any_thumb')
  })

  test('Should return [] if get all fails', async () => {
    const sut = makeSut()
    const user = await sut.getAll()
    expect(user).toEqual([])
  })
})
