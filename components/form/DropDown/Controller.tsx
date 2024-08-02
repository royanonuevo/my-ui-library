import { forwardRef } from 'react'
import { 
  SelectOption, 
  ControllerProps,
  RETURN_TYPE_ARRAY, 
  RETURN_TYPE_VALUE 
} from './types'
import { cn } from '@/lib/utils'
import IconChevronDown from './IconChevronDown'
import Field from '../ui/Field'

const Controller = forwardRef(({
  value,
  options,
  placeholder,
  returnType,
  multipleSelection,
  changeOption,
  // controllerRef,
  handleClick,
  isFocusController,
  styleController,
  hasError,
  disabled,
  readOnly
}: ControllerProps, ref: any) => {

  const renderPlaceholder = () => <span className='text-grey-400'>{ placeholder }</span>

  const renderValue = () => {
    if (returnType === RETURN_TYPE_VALUE) {
      // find the obj using value
      const foundObj = options.find((o: SelectOption) => o.value === value) || ''
      return foundObj? foundObj?.label : renderPlaceholder()
    }

    if (returnType === RETURN_TYPE_ARRAY && !multipleSelection) {
      return value[0]?.label? value[0]?.label : renderPlaceholder()
    }

    if (returnType === RETURN_TYPE_ARRAY && multipleSelection) {
      if (!value.length) return renderPlaceholder()

      return (
        <div className='flex items-center flex-wrap box-border gap-2'>
          {
            value.map((option: SelectOption) => {
              return (
                <div 
                  className='p-1 rounded-md flex justify-start bg-grey-100'
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  key={option.value}
                >
                  <div className={cn({
                    'whitespace-break-spaces break-all flex-1': true,
                    'text-gray-100': disabled
                  })}>{ option.label }</div>

                  <div 
                    className={cn({
                      'w-[20px] text-[18px] text-right cursor-pointer transition hover:text-grey-400': true,
                      'cursor-not-allowed pointer-events-none text-grey-300': disabled
                    })}
                    onClick={() => changeOption(option)}
                  >
                    &times;
                  </div>

                </div>
              )
            })
          }
        </div>
      )
    }
  }
  
  return (
    <Field 
      disabled={disabled || readOnly}
      hasError={hasError}
    >
      <div 
        className={cn(
          'w-full py-[10px] px-[16px] pr-[10px] flex items-center outline-none cursor-pointer', {
            '': isFocusController
          }
        )} 
        tabIndex={0} 
        ref={ref}
        onClick={handleClick}
        style={styleController}
      >
        <div className={cn('flex-1 pr-3 overflow-hidden text-inherit')}>
          { renderValue() }
        </div>
        <IconChevronDown />
      </div>
    </Field>
  )
})

Controller.displayName = 'Controller'

export default Controller