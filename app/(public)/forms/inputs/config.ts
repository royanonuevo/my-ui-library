import { z } from 'zod'
import { FieldConfig } from '@/components/form'


export const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  email: z.string().min(1, {
      message: 'Mandatory Field',
    }).email(),
  password: z.string().min(1, {
      message: 'Mandatory Field',
    }).max(5),
  password2: 
    z.string()
    .min(1, {
      message: 'Mandatory Field',
    }),
  readOnlyInput: z.string(),
  disabledInput: z.string().min(1, {
      message: 'Mandatory Field',
    }),
  appendLeftContent: z.string().min(3),
  appendRightContent: z.string().min(1, {
      message: 'Mandatory Field',
    }),

  isDisableFields: z.boolean() // use only for disabling fields, not part of form data
}).refine((values) => values.password === values.password2, {
  message: 'Passwords don\'t match',
  path: ['password2'],
})

export const defaultValues: z.infer<typeof formSchema> = {
  name: '',
  email: '',
  password: '',
  password2: '',
  readOnlyInput: 'this is a read-only input',
  disabledInput: 'this is a disabled input',
  appendLeftContent: '',
  appendRightContent: '',
  
  isDisableFields: false
}

export const defaultWithValues: z.infer<typeof formSchema> = {
  name: 'Jay Smith',
  email: 'jay@yahooo.co',
  password: '3214',
  password2: '3214',
  readOnlyInput: 'this is a read-only input',
  disabledInput: 'this is a disabled input',
  appendLeftContent: 'left',
  appendRightContent: 'right',
  
  isDisableFields: false
}

const disabled = (values: any, name: any) => { // eslint-disable-line
  return values.isDisableFields === true
}

export const formConfig: FieldConfig[] = [
  {
    name: 'name',
    fieldProps: {
      type: 'input',
      label: 'Name',
      placeholder: 'Ex. John Doe',
      readOnly: false,
      disabled
    }
  },
  {
    name: 'email',
    fieldProps: {
      type: 'input',
      label: 'Email (Disabled)',
      placeholder: 'example@domain.com',
      readOnly: false,
      disabled
    }
  },
  {
    name: 'password',
    fieldProps: {
      type: 'password',
      label: 'Password',
      placeholder: '********',
      togglePassword: false,
      readOnly: false,
      disabled
    }
  },
  {
    name: 'password2',
    fieldProps: {
      type: 'password',
      label: 'Password (with Toggle)',
      placeholder: '********',
      togglePassword: true,
      readOnly: false,
      disabled
    }
  },
  {
    name: 'readOnlyInput',
    fieldProps: {
      type: 'input',
      label: 'ReadOnly Input',
      placeholder: 'Ex. of read-only',
      readOnly: true,
      disabled
    }
  },
  {
    name: 'disabledInput',
    fieldProps: {
      type: 'input',
      label: 'Disabled Input',
      placeholder: '',
      readOnly: false,
      disabled: true
    }
  },
  {
    name: 'appendLeftContent',
    fieldProps: {
      type: 'input',
      label: 'Append Left Content',
      placeholder: 'Enter text',
      readOnly: false,
      disabled,
      appendLeftContent: 'left-content'
    }
  },
  {
    name: 'appendRightContent',
    fieldProps: {
      type: 'input',
      label: 'Append Right Content',
      placeholder: 'Enter text',
      readOnly: false,
      disabled,
      appendRightContent: 'right-content'
    }
  },
]
