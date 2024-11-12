import { cn } from '@/lib/utils'


type TagDiv = {
  useLabelTag?: false,
} & React.ComponentProps<'div'>

type TagLabel = {
  useLabelTag?: true
} & React.ComponentProps<'label'>

type Props = {
  useLabelTag?: boolean,
  name?: string
  label: string
  disabled?: boolean
  errorMode?: boolean
  className?: string
} & (TagDiv | TagLabel)

export default function Label ({
  useLabelTag = true,
  name = '',
  label,
  disabled = false,
  errorMode = false,
  className: className2,
  ref,
  ...otherProps
}: Props) {
  // console.log({...otherProps})
  const className = cn(
    'mb-2 block font-medium text-sm', {
      'text-app-disabled': disabled,
      'text-app-error': errorMode
    },
    className2
  )
  
  if (useLabelTag) {
    return (
      <label htmlFor={name} className={className}>{ label }</label> 
    )
  }

  return (
    // @ts-ignore
    <div className={className} {...otherProps}>{ label }</div>
  )
}