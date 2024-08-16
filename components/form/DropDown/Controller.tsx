import { forwardRef } from 'react'
import { 
  SelectOption, 
  ControllerProps,
  RETURN_TYPE_ARRAY, 
  RETURN_TYPE_VALUE 
} from './types'
import { cn } from '@/lib/utils'
import IconChevronDown from './IconChevronDown'
import Field from '../shared/Field'

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

  const renderPlaceholder = () => <span className='text-app-placeholder whitespace-nowrap'>{ placeholder }</span>

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
                  className='p-1 rounded-md flex justify-start bg-gray-100'
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  key={option.value}
                >
                  <div className={cn({
                    'whitespace-break-spaces break-all flex-1': true
                  })}>{ option.label }</div>

                  <div 
                    className={cn({
                      'w-[20px] text-[18px] text-right cursor-pointer transition text-gray-600 hover:text-gray-700': true,
                      'cursor-not-allowed pointer-events-none text-gray-400': disabled
                    })}
                    onClick={() => changeOption(option)}
                    title='remove'
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
      className={cn({
        'cursor-pointer': !disabled
      })}
    >
      <div 
        className={cn({
          'app-input': true, // global.css'
          'flex items-center': true
        })} 
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