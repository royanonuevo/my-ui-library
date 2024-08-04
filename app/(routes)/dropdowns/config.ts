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
  // agree: z.literal<boolean>(true, { errorMap: () => ({ message: mandatoryTxt }) }),
  agree: z.boolean(),
  continents: z.string().or(z.number().int()),
  countries: z.any().array().min(1, mandatoryTxt),
  countries2: z.any().array().min(2, 'Select atleast 2 countries').max(3),
  // categories: z.any().array().min(1, mandatoryTxt),
  isDisableFields: z.boolean() // use only for disabling fields, not part of form data
}).refine((values) => values.continents !== '', {
  message: mandatoryTxt,
  path: ['continents'],
}).refine((values) => values.agree, {
  message: mandatoryTxt,
  path: ['agree']
})

export const defaultValues: z.infer<typeof formSchema> = {
  dummy1: '',
  dummy2: '',
  agree: false,
  continents: '',
  countries: [],
  countries2: [],
  // categories: [],
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
      label: 'Countries (return [{}])',
      returnType: 'array',
      multipleSelection: false,
      disableToggleOnSelectedOption: false,
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
      multipleSelection: true,
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
