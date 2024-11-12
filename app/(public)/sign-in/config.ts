import { z } from 'zod'


export const formSchema = z.object({
  username: z.string().min(1, {
    message: 'Mandatory Field',
  }),
  password: z.string().min(1, {
      message: 'Mandatory Field',
    }),
  isDisableFields: z.boolean() // use only for disabling fields, not part of form data
})

export const defaultValues: z.infer<typeof formSchema> = {
  username: '',
  password: '',
  isDisableFields: false
}



const disabled = (values: any, name: any) => { // eslint-disable-line
  return values.isDisableFields === true
}

export const formConfig = [
  {
    name: 'username',
    fieldProps: {
      type: 'input',
      label: 'Username',
      placeholder: 'Enter your username',
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
      togglePassword: true,
    }
  }
]
