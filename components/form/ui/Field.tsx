import { cn } from '@/lib/utils'

type Props = {
  disabled: boolean,
  children: React.ReactElement,
} & React.ComponentProps<'div'>

export default function Field ({
  disabled,
  children,
  ...otherProps
}: Props) {
  return (
    <div 
      className={cn(
        'w-full bg-white', {
        'bg-gray-200 cursor-not-allowed': disabled,
      })} 
      {...otherProps}
    >
      { children }
    </div>
  )
}