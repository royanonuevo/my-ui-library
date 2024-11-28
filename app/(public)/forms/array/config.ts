import { z } from 'zod'
import { continentOptions, countryOptions } from './data'
import { FieldConfig } from '@/components/form'

const mandatoryTxt = 'Mandatory field.'

const customersSchema = z.object({ 
  name: z.string().min(1, { message: mandatoryTxt }),
  continents: z.string().or(z.number().int()).refine((value) => value !== '', {
    message: mandatoryTxt
  }),
  countries: z.object({}).passthrough().or(z.undefined()).refine((value) => { return value }, { message: mandatoryTxt }),
  timeHours: z.string().min(1, { message: mandatoryTxt }),
})

export const formSchema = z.object({
  dummy1: z.string().min(1, {
    message: mandatoryTxt,
  }),
  dummy2: z.string().min(1, {
    message: mandatoryTxt,
  }),
  customers: customersSchema.array().min(1, mandatoryTxt),
  agree: z.boolean().refine((value) => value === true, {
    message: mandatoryTxt
  }),
  isDisableFields: z.boolean() // use only for disabling fields, not part of form data
})

export const initialCustomerValue = {
  name: '',
  countries: undefined,
  continents: '',
  timeHours: ''
}
export const defaultValues: z.infer<typeof formSchema> = {
  dummy1: '',
  dummy2: '',
  customers: [initialCustomerValue],
  agree: false,
  isDisableFields: false  // use only for disabling fields, not part of form data
}

const disabled = (values: any, name: any) => { // eslint-disable-line
  return values.isDisableFields === true
}

const customerChildFields: FieldConfig[] = [{
  name: 'name',
  fieldProps: {
    type: 'input',
    label: 'Name',
    placeholder: 'Enter text',
    readOnly: false,
    disabled
  }
}, {
  name: 'continents',
  fieldProps: {
    type: 'dropdown',
    label: 'Continent (return Single "")',
    returnType: 'value',
    placeholder: 'Select continent',
    options: continentOptions,
    disabled
  }
}, {
  name: 'countries',
  fieldProps: {
    type: 'dropdown',
    label: 'Countries (return {})',
    returnType: 'object',
    disableToggleOnSelectedOption: true,
    placeholder: 'Select countries (disabled dpndncy)',
    options: countryOptions,
    disabled: (values: any, name: any, index:number) => { // eslint-disable-line
      return values.isDisableFields === true || !values[name][index]?.continents
    }
  }
}, {
  name: 'timeHours',
  fieldProps: {
    type: 'digits',
    label: '24 Hours',
    placeholder: '12',
    readOnly: false,
    digitsLimit: 24,
    disabled
  }
}]

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
  // Customers
  {
    name: 'customers',
    fieldProps: {
      type: 'input',
      label: 'Customers',
      placeholder: 'Enter text',
      readOnly: false,
      disabled
    },
    childFields: customerChildFields,
  },
]
