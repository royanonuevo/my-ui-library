import { cn } from '@/lib/utils'

type Props = {
  error?: string,
} & React.ComponentProps<'div'>

export default function ErrorText ({
  error = '',
  ...otherProps
}: Props) {
  return (
    <div 
      className={cn(
        'flex items-center text-xs text-app-error mt-1'
      )} 
      {...otherProps}
    >
      { error }
    </div>
  )
}