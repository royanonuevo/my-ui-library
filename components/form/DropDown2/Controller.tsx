import { forwardRef } from 'react'
import { SelectOption, ControllerProps } from './types'
import { cn } from '@/lib/utils'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import { X } from 'lucide-react'
import { limitArrayList } from './utils'

const Controller = forwardRef(({
  value,
  placeholder,
  multiple,
  changeOption,
  onChange,
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
    if (multiple) {
      if (!value.length) return renderPlaceholder()

      return (
        <div className='flex items-center flex-wrap box-border gap-2'>
          {
            limitArrayList(value, 2 as any).map((option: SelectOption) => {
              return (
                <div 
                  className='p-1 rounded-md flex justify-start bg-gray-100'
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  key={option.value}
                >
                  <div className={cn({
                    'whitespace-break-spaces break-all flex-1': true,
                    'text-grey-300': disabled
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
          {
            value.length > 2? (
              <div>...</div>
            ) : null
          }
        </div>
      )
    } else {
      return value? value?.label : renderPlaceholder()
    }    
  }
  
  return (
    <div 
      className={cn(
        'w-full bg-white py-[10px] px-[16px] rounded-md ui-border flex items-center outline-none cursor-pointer', {
          'focus-within:border-focus-100': true,
          '': isFocusController,
          'border-error border': hasError,
          'bg-grey-200 cursor-not-allowed': disabled || readOnly
        }
      )} 
      tabIndex={0} 
      ref={ref}
      onClick={handleClick}
      style={styleController}
    >
      <div 
      className={cn(
        'flex-1 pr-3 overflow-hidden text-inherit',
        'whitespace-nowrap break-normal text-ellipsis'
      )}>
        { renderValue() }
      </div>
      <div className='flex items-center gap-[2px]'>
        <div className='h-6 w-6'>badge{ value.length }</div>
        {
          value.length? (
            <span title='Reset'>
              <X 
                className={cn('h-5 w-5 shrink-0 cursor-pointer hover:opacity-60')} 
                onClick={(e) => {
                  e.stopPropagation()
                  onChange([])
                }}
              />
            </span>
          ) : null
        }
        sortDown
        {/* <FontAwesomeIcon icon={faSortDown} className='-mt-[5px]' /> */}
      </div>
    </div>
  )
})

Controller.displayName = 'Controller'

export default Controller