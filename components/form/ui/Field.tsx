import { cn } from '@/lib/utils'

type Props = {
  className?: React.CSSProperties
  disabled: boolean
  hasError: boolean
  children?: React.ReactNode
} & React.ComponentProps<'div'>

export default function Field ({
  className = '',
  disabled,
  hasError,
  children = null,
  ...otherProps
}: Props) {
  return (
    <div 
      className={cn(
        'w-full bg-white', {
        'rounded-md border-[1px] border-solid border-app-border': true,
        'focus-within:border-gray-400 outline-none': true,
        'bg-app-disabled-inputs cursor-not-allowed': disabled,
        'border-app-error': hasError,
      }, className)} 
      {...otherProps}
    >
      { children }
    </div>
  )
}