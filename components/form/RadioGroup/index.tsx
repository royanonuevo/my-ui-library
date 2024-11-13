import TickBox from './TickBox'
import ErrorText from '../shared/ErrorText'
import { isEqual } from '../shared/utils'
import Label from '../shared/Label'

type Option = {
  label: string
  value: any
  [key: string]: any
}

export type RadioGroupProps = {
 label?: string
 value: any
 options: Option[]
 onChange: any
 onBlur?: any
 error?: string | boolean
 styleLabel?: React.CSSProperties
 disabled?: boolean
}

const RadioGroup = ({
 label = '',
 value,
 options = [],
 onChange,
 onBlur,
 error = '',
 styleLabel,
 disabled = false
}: RadioGroupProps) => { 
 const hasError = error? true : false

 const handleTick = () => {
  if (!disabled) {
    onChange(!value)
  }
 }

 const handleBlur = (e: React.FocusEvent) => {
  if (!e.currentTarget.contains(e.relatedTarget)) {
    onBlur && onBlur()
  }
}

const isOptionSelected = (option: Option) => {
  return isEqual(value, option)
}

const changeOption = (option: Option) => {
  if (disabled) { return }

  if (isEqual(value, option)) {
    onChange?.(undefined)
  } else {
    onChange?.(option)
  }
}

const handleKeyDown = (e: any) => {
  switch(e.code) {
    case 'Enter':
      if (options?.length) {
        const elementIndex = e.target?.dataset?.elementIndex
        changeOption(options[elementIndex])
      } else {
        handleTick()
      }
      break
  }
}



 return (
   <div>
      {label? (
        <Label
          useLabelTag={false}
          label={label}
          disabled={disabled}
          style={styleLabel}
          className='cursor-default'
        /> 
      ): ''}

      <div 
        onKeyDown={handleKeyDown} 
        onBlur={handleBlur}
        className='flex flex-col gap-2' 
      >
        {
          options.map((option, index) => {
            return (
              <TickBox 
                key={`checkbox-option-${option.value}-${index}`}
                label={option.label}
                value={isOptionSelected(option)}
                handleTick={() => { changeOption(option) }}
                onBlur={() => {}}
                hasError={hasError}
                styleLabel={{}}
                disabled={disabled}
                index={index}
              />
            )
          })
        }
      </div>
    
     { hasError && (<ErrorText>{ error }</ErrorText>) }
   </div>
 )
}

export default RadioGroup