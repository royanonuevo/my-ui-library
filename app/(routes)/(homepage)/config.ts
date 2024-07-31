import { z } from 'zod'


export const formSchema = z.object({
  email: z.string().min(1, {
    message: 'Mandatory Field',
  }).email(),
  name: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  password: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  password2: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  readOnly: z.string(),
  disabled: z.string(),
  appendLeftContent: z.string(),
  appendRightContent: z.string(),

  isDisableFields: z.boolean()
})

export const defaultValues: z.infer<typeof formSchema> = {
  name: '',
  email: '',
  password: '',
  password2: '',
  readOnly: 'this is a read-only input',
  disabled: 'this is a disabled input',
  appendLeftContent: '',
  appendRightContent: '',
  
  isDisableFields: false
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
    name: 'readOnly',
    fieldProps: {
      type: 'input',
      label: 'ReadOnly',
      placeholder: 'Ex. of read-only',
      readOnly: true,
      disabled
    }
  },
  {
    name: 'disabled',
    fieldProps: {
      type: 'input',
      label: 'Disabled',
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
      appendRightContent: 'left-content'
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
