import { z } from 'zod'

const purposeOptions = [
  { label: 'Demand', value: 'Demand', a:false },
  { label: 'Request', value: 'Request' },
  { label: 'Notify', value: 'Notify' },
  { label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
  { label: 'Notice', value: 'Notice' },
]

const mandatoryTxt = 'Mandatory field.'
export const formSchema = z.object({
  dummy1: z.string().min(1, {
    message: mandatoryTxt,
  }),
  dummy2: z.string().min(1, {
    message: mandatoryTxt,
  }),
  purpose: z.object({}).passthrough().or(z.undefined()).refine((value) => { return value }, { message: mandatoryTxt }),
  isDisableFields: z.boolean() // use only for disabling fields, not part of form data
})

export const defaultValues: z.infer<typeof formSchema> = {
  dummy1: '',
  dummy2: '',
  purpose: undefined,
  isDisableFields: false,
}

export const defaultWithValues: z.infer<typeof formSchema> = {
  dummy1: 'test 1',
  dummy2: 'test 2',
  purpose: purposeOptions[2],
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
    name: 'dummy2',
    fieldProps: {
      type: 'input',
      label: 'Dummy2',
      placeholder: 'dummy',
      readOnly: false,
      disabled
    }
  },
  {
    name: 'purpose',
    fieldProps: {
      type: 'radio-group',
      label: 'Purpose',
      readOnly: false,
      disabled,
      options: purposeOptions
    }
  },
]
