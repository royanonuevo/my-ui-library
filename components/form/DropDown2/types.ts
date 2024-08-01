export type SelectOption = {
  id: string | number,
  label: string
  value: any,
  [key: string]: any
}

type Placeholder = string

export type SingleSelectProps = {
  multiple?: false
  value?: SelectOption | undefined
  onChange?: (value: SelectOption | undefined) => void // eslint-disable-line
}

export type MultipleSelectProps = {
  multiple: true
  value: SelectOption[]
  onChange?: (value: SelectOption[]) => void // eslint-disable-line
}

export type SelectProps = {
  removeOptionWhenSelected?: boolean
  options?: SelectOption[]
  label: string
  placeholder?: Placeholder
  noOptionsLabel?: string
  optionOneLiner?: boolean
  error?: string,
  onBlur?: Function,
  maxOptionsHeight?: string,
  disabled?: boolean,
  readOnly?: boolean
  styleController?: React.CSSProperties | undefined
} & (SingleSelectProps | MultipleSelectProps)


// type S = {
//   multiple: false | undefined
//   value?: SelectOption | undefined
// }

// type M = {
//   multiple: true
//   value: SelectOption[]
// }


export type ControllerProps = {
  value: any // TODO should not be any!!
  multiple?: boolean
  placeholder: Placeholder
  changeOption: Function
  onChange: any
  // controllerRef: React.RefObject<HTMLDivElement>
  handleClick: () => void
  isFocusController: boolean
  styleController: React.CSSProperties | undefined
  hasError: boolean
  disabled?: boolean
  readOnly?: boolean
} 