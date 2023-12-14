import { TypeormHelper } from '@/infra/db/helpers'
import { GetOneCourseRepository } from './get-one-course-repository'
import { getRepository } from 'typeorm'

const makeSut = (): GetOneCourseRepository => {
  return new GetOneCourseRepository()
}

describe('GetOneCourseRepository', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  afterEach(async () => {
    await TypeormHelper.clear('course')
  })

  afterAll(async () => {
    await TypeormHelper.disconnect()
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
    const result = await sut.getOne(1)
    expect(result).toBeTruthy()
    expect(result.id).toBeTruthy()
    expect(result.name).toBe('any_name')
    expect(result.description).toBe('any_description')
    expect(result.author).toBe('any_author')
    expect(result.thumb).toBe('any_thumb')
  })

  test('Should return undefined if get one fails', async () => {
    const sut = makeSut()
    const user = await sut.getOne(1)
    expect(user).toBeUndefined()
  })
})
