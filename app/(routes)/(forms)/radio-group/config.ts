import { z } from 'zod'

const mandatoryTxt = 'Mandatory field.'
export const formSchema = z.object({
  dummy1: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  concern: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  feedback: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  ingredients: z.array(z.any()).min(2, 'Select at least 2 ingredients').max(4),
  isDisableFields: z.boolean() // use only for disabling fields, not part of form data
})

export const defaultValues: z.infer<typeof formSchema> = {
  dummy1: '',
  concern: '',
  feedback: '',
  ingredients: [],
  isDisableFields: false,
}

const disabled = (values: any, name: any) => { // eslint-disable-line
  return values.isDisableFields === true
}

export const formConfig = [
  {
    name: 'dummy1',
    fieldProps: {
      type: 'input',
      label: 'Dummy1',
      appendLeftContent: 'Dum.',
      placeholder: 'Enter Text',
      readOnly: false,
      disabled
    }
  },
  {
    name: 'concern',
    fieldProps: {
      type: 'textarea',
      label: 'Concern (with auto Bullet)',
      placeholder: 'Enter your concern',
      readOnly: false,
      appendBulletEveryEnter: true,
      rows: 5,
      disabled
    }
  },
  {
    name: 'feedback',
    fieldProps: {
      type: 'textarea',
      label: 'Feedback',
      readOnly: false,
      placeholder: 'Enter text..',
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
