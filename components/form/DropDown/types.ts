export type SelectOption = {
  label: string
  value: any,
  [key: string]: any
}

type Placeholder = string


export const RETURN_TYPE_VALUE = 'value'
export const RETURN_TYPE_ARRAY = 'array'
type ReturnType = typeof RETURN_TYPE_VALUE | typeof RETURN_TYPE_ARRAY

export type SingleSelectProps = {
  returnType?: typeof RETURN_TYPE_VALUE
  value: string
  onChange?: (value: string) => void // eslint-disable-line
}

export type MultipleSelectProps = {
  returnType?: typeof RETURN_TYPE_ARRAY
  value: SelectOption[]
  onChange?: (value: SelectOption[]) => void // eslint-disable-line
}

export type SelectProps = {
  multipleSelection?: boolean
  removeOptionWhenSelected?: boolean
  disableToggleOnSelectedOption?: boolean,
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
  styleLabel?: React.CSSProperties | undefined
} & (SingleSelectProps | MultipleSelectProps)


export type ControllerProps = {
  value: any // TODO should not be any!!
  options: SelectOption[],
  returnType?: ReturnType
  multipleSelection?: boolean
  placeholder: Placeholder
  changeOption: Function
  // controllerRef: React.RefObject<HTMLDivElement>
  handleClick: () => void
  isFocusController: boolean
  styleController: React.CSSProperties | undefined
  hasError: boolean
  disabled?: boolean
  readOnly?: boolean
} 