import { cn } from '@/lib/utils'

type Props = {
  children?: React.ReactNode,
} & React.ComponentProps<'div'>

export default function ErrorText ({
  children,
  ...otherProps
}: Props) {
  return (
    <div 
      className={cn(
        'flex items-center text-xs text-app-error mt-1'
      )} 
      {...otherProps}
    >
      { children }
    </div>
  )
}