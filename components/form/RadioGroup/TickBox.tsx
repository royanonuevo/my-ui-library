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
          'h-[20px] w-[20px] rounded-full flex items-center justify-center mt-[2px]': true,
          'after:hidden after:content-[""] after:w-[11px] after:h-[11px] after:bg-primary after:rounded-full': true,
          'after:block ': value === true,
          'bg-app-disabled-inputs ': value === true && disabled
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