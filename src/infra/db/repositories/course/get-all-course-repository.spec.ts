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
    const result = await sut.getAll({
      skip: 0,
      take: 1
    })
    expect(result).toBeTruthy()
    expect(result.count).toBe(1)
    expect(result.data).toBeTruthy()
    expect(result.data[0].id).toBeTruthy()
    expect(result.data[0].name).toBe('any_name')
    expect(result.data[0].description).toBe('any_description')
    expect(result.data[0].author).toBe('any_author')
    expect(result.data[0].thumb).toBe('any_thumb')
  })

  test('Should return [] if get all fails', async () => {
    const sut = makeSut()
    const user = await sut.getAll({
      skip: 0,
      take: 1
    })
    expect(user).toEqual({
      count: 0,
      data: []
    })
  })
})
