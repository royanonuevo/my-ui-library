import { z } from 'zod'
import { continentOptions, countryOptions } from './data'

const mandatoryTxt = 'Mandatory field.'
export const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  search: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  continents: z.string().or(z.number().int()),
  countries: z.any().array().min(1, mandatoryTxt),
  countries2: z.any().array().min(1, mandatoryTxt).max(3),
  // categories: z.any().array().min(1, mandatoryTxt),
  isDisableFields: z.boolean() // use only for disabling fields, not part of form data
}).refine((values) => values.continents !== '', {
  message: mandatoryTxt,
  path: ['continents'],
})

export const defaultValues: z.infer<typeof formSchema> = {
  name: '',
  search: '',
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
      placeholder: 'Search..',
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
      placeholder: 'Select countries',
      options: countryOptions,
      disabled
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