 import { cn } from '@/lib/utils'

type CheckboxProps = {
  label?: string,
  name?: string,
  error?: string | boolean,
  register?: any,
  isChecked?: boolean,
  className?: string,
  styleLabel?: React.CSSProperties
  useLabelContainer?: boolean
} & React.ComponentProps<'input'>

const CheckBox = ({
  label = '',
  name = '',
  error = '',
  id,
  register,
  isChecked = false,
  className,
  styleLabel,
  useLabelContainer = true,
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
    <div className={className}>
      <ContainerTag
        className='grid grid-cols-[auto_1fr] gap-3 items-start relative cursor-pointer'
      >
        <input 
          {...inputProps}
          type='checkbox' 
          className='peer absolute opacity-0 -z-[1] '
        />
        <div 
          className={cn({
            'h-[24px] w-[24px] border-solid border border-grey-300 flex items-center justify-center rounded': true,
            // 'focus-within:border-focus-100': true,
            'after:content-[""] after:w-[6px] after:h-[13px] after:border-grey-400 after:border-solid': true,
            'after:rotate-45 after:-mt-[3px] after:hidden after:border-t-0 after:border-r-[2px] after:border-b-[2px] after:border-l-0': true,
            'peer-checked:bg-primary peer-checked:border-primary peer-checked:after:border-white peer-checked:after:block': true,
            'peer-disabled:cursor-not-allowed peer-disabled:bg-grey-200 peer-disabled:border-grey-200 peer-disabled:after:border-grey-300': true,
            'border-error': hasError,
          })} 
        />

        <span className='peer-disabled:cursor-not-allowed mt-[3px]' style={styleLabel}>{ label }</span>
      </ContainerTag>

    
      { hasError && (<span className='text-error text-sm mt-[1px]'>{ error } </span>) }
    </div>
  )
}

export default CheckBox