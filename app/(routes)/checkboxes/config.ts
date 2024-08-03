import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  search: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  ingredients: z.any().array().min(2, 'Select at least 2 ingredients').max(4),
 
  isDisableFields: z.boolean() // use only for disabling fields, not part of form data
})

export const defaultValues: z.infer<typeof formSchema> = {
  name: '',
  search: '',
  ingredients: [],
  isDisableFields: false,
}

const disabled = (values: any, name: any) => { // eslint-disable-line
  return values.isDisableFields === true
}

export const formConfig = [
  {
    name: 'name',
    fieldProps: {
      type: 'input',
      label: 'Name',
      appendLeftContent: 'Mr.',
      placeholder: 'Ex. John Doe',
      readOnly: false,
      disabled
    }
  },
  {
    name: 'search',
    fieldProps: {
      type: 'input',
      label: 'Search',
      placeholder: 'Search',
      readOnly: false,
      disabled
    }
  },
  {
    name: 'ingredients',
    fieldProps: {
      type: 'checkbox',
      label: 'Pick Ingredients:',
      readOnly: false,
      disabled,
      options: [
        { label: 'Tomato', value: 'Tomato', a:false },
        { label: 'Pepper', value: 'Pepper' },
        { label: 'Potato', value: 'Potato' },
        { label: 'Salt', value: 'Salt' },
        { label: 'Vinegar', value: 'Vinegar' },
      ]
    }
  },
]
