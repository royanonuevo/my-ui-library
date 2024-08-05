import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Option = {
  label: string
  value: any,
  [key: string]: any
}

type Props = {
  variant?: 'default' | 'color' | 'radio'
  options: Option[]
  label?: string | null
  name: string
  value: Option | undefined
  onChange?: any
  disabled?: boolean
  error?: string
}

export default function RadioButtons ({
  variant = 'default',
  options,
  label = null,
  name,
  value,
  onChange,
  disabled = false,
  error = ''
}: Props ) {

  const hasError = error? true : false

  const renderVariantDefault = (isSelected: boolean, option: Option, index: number) => {
    return (
      <Button 
        variant={isSelected? 'default' : 'outline'} 
        size='sm' 
        asChild 
        key={`radio-option-${option.key}-${index}`} 
        className='cursor-pointer py-4'
      >
        <label className='flex items-center gap-2 block relative'>
          <input
            type='radio'
            name={name}
            checked={option.value === value?.value}
            className='absolute right-0 bottom-0 -z-[1] opacity-0'
            onChange={() => {
              onChange(option)
            }}
          />
          <div className='text-center'>{ option.label }</div>
        </label>
      </Button>
    )
  }

  const renderVariantRadio = (isSelected: boolean, option: Option, index: number) => {
    return (
      <label 
        key={`radio-option-${option.key}-${index}`} 
        className='flex items-center gap-2 relative cursor-pointer'
      >
        <input
          type='radio'
          name={name}
          checked={option.value === value?.value}
          className={cn({
            'peer': true,
            'absolute right-0 bottom-0 -z-[1] opacity-0': true
          })}
          onChange={() => {
            onChange(option)
          }}
          disabled={disabled}
        />

        {/* <div className={cn({
          'h-[20px] w-[20px] border border-grey-300 border-solid rounded-full': true,
          'bg-primary border-transparent': isSelected
        })}>
          
        </div> */}
        <div 
          className={cn({
            'h-[24px] w-[24px] rounded-full border-solid border border-grey-300 flex items-center justify-center': true,
            // 'focus-within:border-focus-100': true,
            'after:content-[""] after:w-[6px] after:h-[13px] after:border-grey-400 after:border-solid': true,
            'after:rotate-45 after:-mt-[3px] after:hidden after:border-t-0 after:border-r-[2px] after:border-b-[2px] after:border-l-0': true,
            'peer-checked:bg-primary peer-checked:border-primary peer-checked:after:border-white peer-checked:after:block': true,
            'peer-disabled:cursor-not-allowed peer-disabled:bg-grey-200 peer-disabled:border-grey-200 peer-disabled:after:border-grey-300': true,
            'border-error': hasError,
          })} 
        />
        <div className=''>{ option.label }</div>
      </label>
    )
  }

  const renderVariantColor = (isSelected: boolean, option: Option, index: number) => {
    return (
      <Button 
        variant={isSelected? 'default' : 'outline'} 
        size='sm' 
        asChild 
        key={`radio-option-${option.key}-${index}`} 
        className={cn({
          'cursor-pointer p-0 m-0 rounded-none ui-border': true,
          'border-primary': isSelected
        })}
        style={{ backgroundColor: option.hex }}
        title={option.label}
      >
        <label className='flex items-center gap-2 block relative h-[20px] w-[20px]'>
          <input
            type='radio'
            name={name}
            checked={option.value === value?.value}
            className='absolute right-0 bottom-0 -z-[1] opacity-0'
            onChange={() => {
              onChange(option)
            }}
          />
        </label>
      </Button>
    )
  }

  return (
    <div>
      {
        label !== null? (
          <div className={cn(
            'mb-2 block font-semibold text-sm', {
              'text-gray-400': disabled
            }
          )}>
            { label }
          </div>
        ) : ''
      }
      
      <div className={cn({
        'flex gap-4 w-full': true,
        'pt-2': variant === 'radio'
      })}>
        {
          options.map((option: Option, index: number) => {
            const isSelected = option.value === value?.value
            if (variant === 'color') {
              return renderVariantColor(isSelected, option, index)
            }

            if (variant === 'radio') {
              return renderVariantRadio(isSelected, option, index)
            }

            return renderVariantDefault(isSelected, option, index)
          })
        }
      </div>
      { hasError? (
        <span className={cn(
          'flex items-center text-xs text-error mt-[13px] ml-1', {
          // 'text-sm': variantSize === 'small',
          // 'text-base': variantSize === 'medium'
          })}>
          { error }
        </span>
      ) : null}
    </div>
  )
}