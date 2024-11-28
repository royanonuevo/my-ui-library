import FieldController from './FieldController'

// import AutoComplete from './AutoComplete'
import Input, { InputProps } from './Input'
import Digits, { DigitsProps } from './Digits'
import TextArea, { TextAreaProps } from './TextArea'
import DropDown, { DropDownProps } from './DropDown'
import CheckBox, { CheckBoxProps } from './CheckBox'
import RadioGroup, { RadioGroupProps } from './RadioGroup'
// import DropDown2 from './DropDown2'
// import SearchTags from './SearchTags'

// import Slider from './Slider'

export {
  FieldController,
  Input,
  Digits,
  TextArea,
  DropDown,
  // DropDown2,
  CheckBox,
  RadioGroup
  // AutoComplete,
  // SearchTags,
  // RadioButtons,
  // Slider
}

export const TYPE_INPUT = 'input'
export const TYPE_PASSWORD = 'password'
export const TYPE_DIGITS = 'digits'
export const TYPE_TEXTAREA = 'textarea'
export const TYPE_DROPDOWN = 'dropdown'
export const TYPE_CHECKBOX = 'checkbox'
export const TYPE_RADIO_GROUP = 'radio-group'

type InputTypeProps = { type: typeof TYPE_INPUT } & InputProps
type InputPasswordProps = { type: typeof TYPE_PASSWORD } & InputProps
type DigitsTypeProps = { type: typeof TYPE_DIGITS } & DigitsProps
type TextareaTypeProps = { type: typeof TYPE_TEXTAREA } & TextAreaProps
type InputDropDownProps = { type: typeof TYPE_DROPDOWN } & Omit<DropDownProps, 'value'>
type InputCheckboxProps = { type: typeof TYPE_CHECKBOX } & Omit<CheckBoxProps, 'value' | 'onChange'>
type InputRadioProps = { type: typeof TYPE_RADIO_GROUP } & Omit<RadioGroupProps, 'value' | 'onChange'>

type FieldProps = InputTypeProps | InputPasswordProps | DigitsTypeProps | TextareaTypeProps | InputDropDownProps | InputCheckboxProps | InputRadioProps
export type FieldConfig = {
  name: string
  fieldProps: {
    type: typeof TYPE_INPUT | typeof TYPE_PASSWORD | typeof TYPE_DIGITS | typeof TYPE_TEXTAREA | typeof TYPE_DROPDOWN | typeof TYPE_CHECKBOX |  typeof TYPE_RADIO_GROUP
    disabled?: any
  } & FieldProps
}

export default FieldController