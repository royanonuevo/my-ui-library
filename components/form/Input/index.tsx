import { forwardRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import Label from '../shared/Label'
import ErrorText from '../shared/ErrorText'
import Field from '../shared/Field'

type InputProps = {
  label?: string
  id?: string
  name?: string
  fieldArrayName?: string
  type?: string
  error?: any
  register?: Function
  appendRightContent?: React.ReactElement | null
  appendLeftContent?: React.ReactElement | null
  showErrorMessages?: boolean
  togglePassword?: boolean
  debounceDuration?: number
  onChange?: any
} & React.ComponentProps<'input'> & React.RefAttributes<any>

const Input = forwardRef(({
  type = 'text',
  label = '',
  name,
  value = '',
  fieldArrayName = '',
  error = '',
  register,
  appendLeftContent = null,
  appendRightContent = null,
  showErrorMessages = true,
  togglePassword = false,
  debounceDuration = 0,
  ...otherProps
}: InputProps, ref: any) => {
  const [showPassword, setShowPassword] = useState(false)
  const [inputValue, setInputValue] = useState<any>(value)
  const [inputEventValue, setInputEventValue] = useState<any>(null)

  // console.log('value', value)
  if (type === 'password' && togglePassword && showPassword) {
    type = 'text'
  }

  let onChangeProps: any = {}

  if (debounceDuration > 0) {
    onChangeProps = {
      value: inputValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        setInputEventValue(e)
      },
    }
  } else {
    onChangeProps = {
      value
    }
  }

  let inputProps = {
    type,
    label,
    name: name,
    id: otherProps?.id || name,
    ...otherProps,
    ...onChangeProps,
    className: cn({
        'app-input': true, // global.css
        'pl-[7px]': appendLeftContent,
        'pr-[7px]': appendRightContent
      }
    )
  }

  // if react hook form register mounted
  if (register) {
    inputProps = {
      ...inputProps,
      ...register(fieldArrayName || name, {
        // disabled: otherProps?.disabled
      })
    }
  }
  
  if (appendLeftContent || appendRightContent) {
    inputProps = {
      ...inputProps,
      autoComplete: 'off'
    }
  }

  const hasError = error? true : false

  useEffect(() => {
    if (debounceDuration === 0) return // don't run debounce

    const timeout = setTimeout(() => {
      const SyntheticBaseEvent = {
        ...inputEventValue,
        target: {
          ...inputEventValue?.target,
          value: inputValue
        }
      }
      otherProps?.onChange?.(SyntheticBaseEvent)
    }, debounceDuration)

    return () => clearTimeout(timeout)
  }, [inputValue]) // eslint-disable-line

  useEffect(() => {
    if (debounceDuration === 0) return // don't run debounce related
    setInputValue(value)
  }, [value]) // eslint-disable-line

  return (
    <div className='w-full'>
      {label && (
        <Label name={name} label={label} disabled={otherProps?.disabled} />
      )}

      <Field
        disabled={otherProps?.disabled || false}
        hasError={hasError}
      >
        <div className='flex items-center'>
          { appendLeftContent && (
            <span className='ml-4 text-gray-400'>
              { appendLeftContent }
            </span>
          )}

          { ref? <input ref={ref} {...inputProps} /> : <input {...inputProps} /> }

          { appendRightContent && (
            <span className='mr-4 text-gray-400'>
              { appendRightContent }
            </span>
          )}

          { togglePassword === true && (
            <span 
              className='mr-4 text-gray-400 cursor-pointer text-[10px]'
              onClick={() => {
                setShowPassword(!showPassword)
              }}
            >
              { showPassword? 'hide' : 'show' }
            </span>
          )}
        </div>
      </Field>
      { hasError && showErrorMessages? ( <ErrorText>{ error }</ErrorText>) : null}
    </div>
  )
})

Input.displayName = 'Input'

export default Input