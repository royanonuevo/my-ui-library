import { z } from 'zod'
import { continentOptions, countryOptions } from './data'

const mandatoryTxt = 'Mandatory field.'

export const formSchema = z.object({
  agree: z.boolean(),
 
  isDisableFields: z.boolean() // use only for disabling fields, not part of form data
}).refine((values) => values.continents !== '', {
  message: mandatoryTxt,
  path: ['continents'],
}).refine((values) => values.agree, {
  message: mandatoryTxt,
  path: ['agree']
})

export const defaultValues: z.infer<typeof formSchema> = {
  agree: false,
}

const disabled = (values: any, name: any) => { // eslint-disable-line
  return values.isDisableFields === true
}

export const formConfig = [
  {
    name: 'agree',
    fieldProps: {
      type: 'checkbox',
      label: 'I agree to Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      readOnly: false,
      disabled
    }
  },
]
