import { forwardRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import Label from '../ui/Label'
import ErrorText from '../ui/ErrorText'

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
  variantSize?: 'small' | 'medium'
  variantStyle?: 'default' | 'dropdown-search'
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
  variantSize = 'medium',
  togglePassword = false,
  variantStyle = 'default',
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
    ...otherProps,
    ...onChangeProps,
    className: cn(
      'peer w-full bg-white rounded-md flex-1',
      'focus:outline-none',
      'placeholder:text-grey-400',
      {
        'cursor-not-allowed bg-grey-200 text-grey-300': otherProps?.disabled,
        'text-sm py-[8px] px-[12px]': variantSize === 'small',
        'text-base py-[10px] px-[16px]': variantSize === 'medium',
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

      <div
        className={cn(
          'flex items-center',
          'w-full bg-white',
          'focus-within:border-focus-100 placeholder:slate-gray-400 ',
          {
            // 'bg-slate-100': otherProps?.readOnly && !otherProps?.disabled,
            'bg-gray-200 cursor-not-allowed': otherProps?.disabled,
            'rounded-t-md border-b-[1px] border-b-gray-200' : variantStyle === 'dropdown-search',
            'rounded-md border-[1px] border-solid border-app-border' : variantStyle === 'default',
            'border-app-error': hasError,
          }
        )}
      >
        { appendLeftContent && (
          <span className={cn('ml-4 text-grey-400', {
            'text-grey-300 bg-grey-200': otherProps?.disabled
          })}>
            { appendLeftContent }
          </span>
        )}

        { ref? <input ref={ref} {...inputProps} /> : <input {...inputProps} /> }

        { appendRightContent && (
          <span className={cn('mr-4 text-grey-400', {
            'text-grey-300 bg-grey-200': otherProps?.disabled
          })}>
            { appendRightContent }
          </span>
        )}

        {
          togglePassword === true && (
            <span 
              className={cn('mr-4 text-grey-400 cursor-pointer text-[10px]', {
                'text-grey-300 bg-grey-200': otherProps?.disabled
              })}
              onClick={() => {
                setShowPassword(!showPassword)
              }}
            >
              {/* <FontAwesomeIcon 
                icon={showPassword? faEyeSlash : faEye}
                className='mr-2'
              /> */}
              { showPassword? 'hide' : 'show' }
            </span>
          )
        }

      </div>
      { hasError && showErrorMessages? ( <ErrorText error={error} />) : null}
    </div>
  )
})

Input.displayName = 'Input'

export default Input