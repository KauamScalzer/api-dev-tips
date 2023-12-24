import { Validation } from '@/presentation/protocols/validation'

export class ValidationComposite implements Validation {
  constructor (
    private readonly validations: Validation[]
  ) {}

  async validate (data: any): Promise<Error> {
    for (const validation of this.validations) {
      const error = await validation.validate(data)
      if (error) {
        return error
      }
    }
  }
}
