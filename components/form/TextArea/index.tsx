
// import { Textarea } from '@/components/ui/textarea'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import ErrorText from '../shared/ErrorText'
import Label from '../shared/Label'
import Field from '../shared/Field'

type Props = {
  label?: string
  id?: string
  name?: string
  fieldArrayName?: string
  error?: any
  register?: Function
  showErrorMessages?: boolean
  styleLabel?: React.CSSProperties
  appendBulletEveryEnter?: boolean
} & React.ComponentProps<'textarea'> & React.RefAttributes<any>

const TextArea = forwardRef(({
  label = '',
  name,
  fieldArrayName = '',
  error = '',
  register,
  showErrorMessages = true,
  styleLabel = {},
  appendBulletEveryEnter = false,
  ...otherProps
}: Props, ref: any) => {

  const bullet = '\u2022'
  const bulletWithSpace = `${bullet} `
  const enter = 13

  const handleKeyUp = (event: any) => {
    if (!appendBulletEveryEnter) return
    
    const { keyCode, target } = event
    const { selectionStart, value } = target
    
    if (keyCode === enter) {
      // console.log('a');
      target.value = [...value]
        .map((c, i) => i === selectionStart - 1
          ? `\n${bulletWithSpace}`
          : c
        )
        .join('')
        // console.log(target.value);
        
      target.selectionStart = selectionStart+bulletWithSpace.length
      target.selectionEnd = selectionStart+bulletWithSpace.length
    }
    
    if (value[0] !== bullet) {
      target.value = `${bulletWithSpace}${value}`
    }
  }

  let inputProps = {
    label,
    name,
    id: otherProps?.id || name,
    ...otherProps,
    className: cn({
      'app-input': true, // global.css
    })
  }

  // if react hook form register mounted
  if (register) {
    inputProps = {
      ...inputProps,
      ...register(fieldArrayName || name, {
        disabled: otherProps?.disabled
      }),
      onKeyUp: handleKeyUp
    }
  }

  const hasError = error? true : false

  return (
    <div>
      {label && (
        <Label name={name} label={label} disabled={otherProps?.disabled} />
      )}
      <Field
        disabled={otherProps?.disabled || false}
        hasError={hasError}
      >
        { ref? <textarea ref={ref} {...inputProps} /> : <textarea {...inputProps} /> }
      </Field>
      { hasError && showErrorMessages? ( <ErrorText>{ error }</ErrorText>) : null}
    </div>
  )
})

TextArea.displayName = 'TextArea'

export default TextArea