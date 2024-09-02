import { z } from 'zod'


export const formSchema = z.object({
  title: z.string(),
  isDisableFields: z.boolean() // use only for disabling fields, not part of form data
})

export const defaultValues: z.infer<typeof formSchema> = {
  title: '',
  isDisableFields: false
}

const disabled = (values: any, name: any) => { // eslint-disable-line
  return values.isDisableFields === true
}

export const formConfig = [
  {
    name: 'title',
    fieldProps: {
      type: 'input',
      label: '',
      placeholder: 'Enter your Todo',
      readOnly: false,
      disabled
    }
  }
]
