import { z } from 'zod'
import { FieldConfig, FieldTypes } from '@/components/form'

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
  isDisableFields: z.boolean() // use only for disabling fields, not part of form data
})

export const defaultValues: z.infer<typeof formSchema> = {
  dummy1: '',
  concern: '',
  feedback: '',
  isDisableFields: false,
}

export const defaultWithValues: z.infer<typeof formSchema> = {
  dummy1: 'dummy',
  concern: '• my concern1\n• my concern2\n',
  feedback: 'my feedback',
  isDisableFields: false,
}

const disabled = (values: any, name: any) => { // eslint-disable-line
  return values.isDisableFields === true
}

export const formConfig: FieldConfig<FieldTypes>[] = [
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
      placeholder: 'Disabled dependency',
      disabled: (values: any) => {
        return values.isDisableFields === true || !values.dummy1
      }
    }
  },
]
