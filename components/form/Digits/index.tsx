import { Input } from '@/components/form'

type Props = {
  digitsLimit: number,
  onChange: any
}

const Digits = ({
  digitsLimit,
  onChange,
  ...otherFieldProps
}: Props) => {
  return (
    <Input 
      {...otherFieldProps}
      type='text'
      onChange={event => {
        const { name, value } = event.target
        let newValue = value
        // fake event
        const formattedEvent = {
          ...event,
          target: {
            ...event.target,
            name,
            value: newValue
          }
        }
        const inputValue = newValue.replace(/\D/g, '') // Remove non-digit characters
        let paddedValue = inputValue? String(Math.min(parseInt(inputValue, 10), digitsLimit)).padStart(2, '0') : ''
        formattedEvent.target.value = paddedValue
        onChange(formattedEvent)
      }}
    />
  )
}

export default Digits
