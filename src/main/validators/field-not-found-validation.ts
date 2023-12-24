import { IGetOneCustomRepository } from '@/data/protocols/db/validations'
import { NotFoundError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'

export class FieldNotFoundValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly model: any,
    private readonly getOneCustomRepository: IGetOneCustomRepository
  ) {}

  async validate (data: any): Promise<Error> {
    const param: any = {}
    param[this.fieldName] = data[this.fieldName]
    const isInUse = await this.getOneCustomRepository.getOne(param, this.model)
    if (!isInUse) {
      return new NotFoundError(this.fieldName)
    }
  }
}
