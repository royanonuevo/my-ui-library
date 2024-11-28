import Input, { InputProps } from '@/components/form/Input'

export type DigitsProps = {
  digitsLimit: number,
  onChange?: any
} & InputProps

const Digits = ({
  digitsLimit,
  onChange,
  ...otherFieldProps
}: DigitsProps) => {
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
