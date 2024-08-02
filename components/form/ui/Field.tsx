import { cn } from '@/lib/utils'

type Props = {
  className?: React.CSSProperties
  disabled: boolean
  hasError: boolean
  children: React.ReactNode
} & React.ComponentProps<'div'>

export default function Field ({
  className = '',
  disabled,
  hasError,
  children,
  ...otherProps
}: Props) {
  return (
    <div 
      className={cn(
        'w-full bg-white', {
        'rounded-md border-[1px] border-solid border-app-border': true,
        'focus-within:border-gray-400': true,
        'bg-gray-200 cursor-not-allowed': disabled,
        'border-app-error': hasError,
      }, className)} 
      {...otherProps}
    >
      { children }
    </div>
  )
}