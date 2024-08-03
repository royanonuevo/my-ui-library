import { cn } from '@/lib/utils'
import TickBox from './TickBox'
import ErrorText from '../shared/ErrorText'
import { containsObject, isEqual } from '../shared/utils'
import Label from '../shared/Label'

type Option = {
  label: string
  value: any
  [key: string]: any
}

type Props = {
 label?: string
 value: any
 options?: Option[]
 onChange: any
 onBlur?: any
 error?: string | boolean
 styleLabel?: React.CSSProperties
 disabled?: boolean
}

const CheckBox = ({
 label = '',
 value,
 options = [],
 onChange,
 onBlur,
 error = '',
 styleLabel,
 disabled = false
}: Props) => { 
 const hasError = error? true : false

 const handleTick = () => {
  onChange(!value)
 }

 const handleBlur = (e: React.FocusEvent) => {
  if (!e.currentTarget.contains(e.relatedTarget)) {
    onBlur && onBlur()
  }
}

const isOptionSelected = (option: Option) => {
  if (!options.length) return false
  return containsObject(value, option)
}


const renderTickBoxes = () => {
  if (options?.length) {
    return (
      <div>
        {label? (
          <Label
            useLabelTag={false}
            label={label}
            disabled={disabled}
            style={styleLabel}
            errorMode={hasError}
          /> 
        ): ''}

        <div className='flex flex-col gap-2'>
          {
            options.map((option, index) => {
              return (
                <TickBox 
                  key={`checkbox-option-${option.value}-${index}`}
                  label={option.label}
                  value={isOptionSelected(option)}
                  handleTick={() => {
                    if (containsObject(value, option)) {
                      console.log('option1', value)
                      onChange?.(value.filter((o: Option) => !isEqual(o, option)))
                    } else {
                      console.log('option2')
                      onChange?.([...value, option])
                    }
                  }}
                  onBlur={() => {}}
                  hasError={false}
                  styleLabel={{}}
                  disabled={disabled}
                />
              )
            })
          }
          
        </div>
      </div>
    )
  }

  return (
    <TickBox 
      label={label}
      value={Boolean(value)}
      handleTick={handleTick}
      onBlur={handleBlur}
      hasError={hasError}
      styleLabel={styleLabel}
      disabled={disabled}
    />
  )
}

 return (
   <div>
     { renderTickBoxes() }
     { hasError && (<ErrorText>{ error }</ErrorText>) }
   </div>
 )
}

export default CheckBox