import { IGetOneCustomRepository } from '@/data/protocols/db/validations'
import { InUseError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'

export class FieldInUseValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly model: any,
    private readonly getOneCustomRepository: IGetOneCustomRepository
  ) {}

  async validate (data: any): Promise<Error> {
    const param: any = {}
    param[this.fieldName] = data[this.fieldName]
    const isInUse = await this.getOneCustomRepository.getOne(param, this.model)
    if (isInUse && isInUse.id !== parseInt(data.id)) {
      return new InUseError(this.fieldName)
    }
  }
}
