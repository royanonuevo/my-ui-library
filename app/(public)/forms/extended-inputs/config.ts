import { z } from 'zod'
import { FieldConfig, FieldTypes } from '@/components/form'

export const formSchema = z.object({
  debounce: z.string().min(3, {
    message: 'Minimum 3 characters',
  }),
  timeHours: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  timeMinutes: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  isDisableFields: z.boolean() // use only for disabling fields, not part of form data
})

export const defaultValues: z.infer<typeof formSchema> = {
  debounce: '',
  timeHours: '',
  timeMinutes: '',
  isDisableFields: false
}

export const defaultWithValues: z.infer<typeof formSchema> = {
  debounce: 'test',
  timeHours: '10',
  timeMinutes: '00',
  isDisableFields: false
}

const disabled = (values: any, name: any):boolean => { // eslint-disable-line
  return values.isDisableFields === true
}

export const formConfig: FieldConfig<FieldTypes>[] = [
  {
    name: 'debounce',
    fieldProps: {
      type: 'input',
      label: 'Debounce',
      placeholder: 'Check console log to see debounce change',
      readOnly: false,
      debounceDuration: 2000,
      onChange: (e: any) => {
        const val = e.target.value
        console.log('debounce: ', val)
      },
      disabled
    }
  },
  {
    name: 'timeHours',
    fieldProps: {
      type: 'digits',
      label: 'Hours (digits)',
      placeholder: '08',
      readOnly: false,
      digitsLimit: 24,
      disabled
    }
  },
  {
    name: 'timeMinutes',
    fieldProps: {
      type: 'digits',
      label: 'Minutes (digits)',
      placeholder: '00',
      readOnly: false,
      digitsLimit: 59,
      disabled
    }
  },
]
