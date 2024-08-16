import { z } from 'zod'
import { continentOptions, countryOptions } from './data'

const mandatoryTxt = 'Mandatory field.'

export const formSchema = z.object({
  dummy1: z.string().min(1, {
    message: mandatoryTxt,
  }),
  dummy2: z.string().min(1, {
    message: mandatoryTxt,
  }),
  agree: z.boolean().refine((value) => value === true, {
    message: mandatoryTxt
  }),
  continents: z.string().or(z.number().int()).refine((value) => value !== '', {
    message: mandatoryTxt
  }),
  // countries: z.any().array().min(1, mandatoryTxt),
  countries: z.object({}).passthrough().or(z.undefined()).refine((value) => { return value }, { message: mandatoryTxt }),
  countries2: z.any().array().min(2, 'Select atleast 2 countries').max(3),
  isDisableFields: z.boolean() // use only for disabling fields, not part of form data
})

export const defaultValues: z.infer<typeof formSchema> = {
  dummy1: '',
  dummy2: '',
  agree: false,
  continents: '',
  countries: undefined,
  countries2: [],
  isDisableFields: false  // use only for disabling fields, not part of form data
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
      placeholder: 'Enter text',
      readOnly: false,
      disabled
    }
  },
  {
    name: 'dummy2',
    fieldProps: {
      type: 'input',
      label: 'Dummy2',
      placeholder: 'dummy (disabled dpndncy)',
      readOnly: false,
      disabled: (values: any, name: any) => { // eslint-disable-line
        return values.isDisableFields === true || !values.dummy1
      }
    }
  },
  {
    name: 'agree',
    fieldProps: {
      type: 'checkbox',
      label: 'I agree to Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      readOnly: false,
      disabled
    }
  },
  {
    name: 'continents',
    fieldProps: {
      type: 'dropdown',
      label: 'Continents (return Single "")',
      returnType: 'value',
      placeholder: 'Select continents',
      options: continentOptions,
      disabled
    }
  },
  {
    name: 'countries',
    fieldProps: {
      type: 'dropdown',
      label: 'Countries (return {})',
      returnType: 'object',
      disableToggleOnSelectedOption: true,
      placeholder: 'Select countries (disabled dpndncy)',
      options: countryOptions,
      disabled: (values: any, name: any) => { // eslint-disable-line
        return values.isDisableFields === true || !values.continents
      }
    }
  },
  {
    name: 'countries2',
    fieldProps: {
      type: 'dropdown',
      label: 'Countries2 (return [{},{},{}]]',
      returnType: 'array',
      placeholder: 'Select countries2',
      options: countryOptions,
      disabled
    }
  },
  {
    name: 'categories',
    fieldProps: {
      type: 'dropdown2',
      label: 'Categories (Multiple)',
      multiple: true,
      placeholder: 'Select categories',
      options: countryOptions,
      disabled
    }
  },
]
