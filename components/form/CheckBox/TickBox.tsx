import { cn } from '@/lib/utils'
import Field from '../shared/Field'

type CheckboxProps = {
  label?: string,
  value: boolean,
  handleTick: any,
  onBlur?: any,
  hasError: boolean,
  styleLabel?: React.CSSProperties
  disabled?: boolean
  index?: number
}

const TickBox = ({
  label = '',
  value,
  handleTick,
  onBlur,
  hasError,
  styleLabel,
  disabled = false,
  index = 0
}: CheckboxProps) => { 

 return (
    <div
      className='grid grid-cols-[auto_1fr] gap-3 items-start relative cursor-pointer'
    >
      <Field 
        tabIndex={0}
        onBlur={onBlur}
        onClick={handleTick}
        disabled={disabled}
        hasError={hasError}
        data-element-index={index}
        className={cn({
          'h-[20px] w-[20px] flex items-center justify-center rounded mt-[2px]': true,
          'after:content-[""] after:w-[6px] after:h-[13px]': true,
          'after:hidden after:rotate-45 after:-mt-[3px] after:border-t-0 after:border-r-[3px] after:border-b-[3px] after:border-l-0': true,
          'after:block bg-primary border-primary after:border-white': value === true,
          'bg-app-disabled-inputs border-app-disabled-inputs after:border-primary': value === true && disabled
        })} 
      />

      <span 
        onClick={handleTick}
        className={cn({
          'mt-[3px]': true,
          'cursor-not-allowed text-app-disabled': disabled
        })}
        style={styleLabel}
      >
        { label }
      </span>
    </div>
 )
}

export default TickBox