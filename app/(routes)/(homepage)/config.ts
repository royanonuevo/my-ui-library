import { z } from 'zod'


export const formSchema = z.object({
  email: z.string().min(1, {
    message: 'Mandatory Field',
  }).email(),
  name: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  isDisableFields: z.boolean()
})

export const defaultValues: z.infer<typeof formSchema> = {
  name: '',
  email: '',
  isDisableFields: false
}

const disabled = (values: any, name: any) => { // eslint-disable-line
  return values.isDisableFields === true
}

export const formConfig = [
  {
    name: 'name',
    fieldProps: {
      type: 'input',
      label: 'Name (Read Only)',
      placeholder: 'Ex. John Doe',
      readOnly: false,
      disabled
    }
  },
  {
    name: 'email',
    fieldProps: {
      type: 'input',
      label: 'Email (Disabled)',
      placeholder: 'example@domain.com',
      readOnly: false,
      disabled
    }
  },
]
