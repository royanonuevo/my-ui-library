import { z } from 'zod'

const mandatoryTxt = 'Mandatory field.'

export const formSchema = z.object({
  ingredients: z.any().array().min(1, mandatoryTxt).max(3),
 
  isDisableFields: z.boolean() // use only for disabling fields, not part of form data
})

export const defaultValues: z.infer<typeof formSchema> = {
  ingredients: [],
  isDisableFields: false
}

const disabled = (values: any, name: any) => { // eslint-disable-line
  return values.isDisableFields === true
}

export const formConfig = [
  {
    name: 'ingredients',
    fieldProps: {
      type: 'checkbox',
      label: 'I agree to Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      readOnly: false,
      disabled
    }
  },
]
