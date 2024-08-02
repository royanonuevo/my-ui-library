 import { cn } from '@/lib/utils'
 import ErrorText from '../ui/ErrorText'
 import Field from '../ui/Field'

type CheckboxProps = {
  label?: string,
  name?: string,
  error?: string | boolean,
  register?: any,
  isChecked?: boolean,
  styleLabel?: React.CSSProperties
  useLabelContainer?: boolean
  disabled?: boolean
} & React.ComponentProps<'input'>

const CheckBox = ({
  label = '',
  name = '',
  error = '',
  id,
  register,
  isChecked = false,
  styleLabel,
  useLabelContainer = true,
  disabled = false,
  ...otherProps
}: CheckboxProps) => {



  let inputProps = {
    id: id || name,
    name,
    ...otherProps
  }

  // if react hook form register mounted
  if (register) {
    inputProps = {
      ...inputProps,
      ...register(name)
    }
  } else {
    inputProps = {
      ...inputProps,
      checked: isChecked,
    }
  }
  
  const hasError = error? true : false

  const ContainerTag = useLabelContainer? 'label' : 'div'
  
  return (
    <div>
      <ContainerTag
        className='grid grid-cols-[auto_1fr] gap-3 items-start relative cursor-pointer'
      >
        <input 
          {...inputProps}
          disabled={disabled}
          type='checkbox' 
          className='peer absolute opacity-0 -z-[1] invisible'
        />
        <Field 
          disabled={disabled}
          hasError={hasError}
          tabIndex={0}
          className={cn({
            'h-[20px] w-[20px] flex items-center justify-center rounded mt-[2px]': true,

            'after:content-[""] after:w-[6px] after:h-[13px]': true,
            'after:hidden after:rotate-45 after:-mt-[3px] after:border-t-0 after:border-r-[3px] after:border-b-[3px] after:border-l-0': true,
            'peer-checked:after:block peer-checked:bg-primary peer-checked:border-primary peer-checked:after:border-white': true,
            'peer-checked:bg-app-disabled-inputs peer-checked:border-app-disabled-inputs': disabled,
            'peer-checked:after:border-primary': disabled,
          })} 
        />

        <span className='peer-disabled:cursor-not-allowed mt-[3px]' style={styleLabel}>{ label }</span>
      </ContainerTag>

    
      { hasError && (<ErrorText>{ error }</ErrorText>) }
    </div>
  )
}

export default CheckBox