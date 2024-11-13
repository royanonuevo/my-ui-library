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

// Define the map with all types and their respective props
type InputPropsCustom = Omit<InputProps, 'disabled'>
type FieldPropsMap = {
  [TYPE_INPUT]: InputPropsCustom
  [TYPE_PASSWORD]: InputPropsCustom
  [TYPE_DIGITS]: DigitsProps
  [TYPE_TEXTAREA]: TextAreaProps
  [TYPE_DROPDOWN]: DropDownProps
  [TYPE_CHECKBOX]: CheckBoxProps
  [TYPE_RADIO_GROUP]: RadioGroupProps
  // ...other types as needed
}

// Get a union of all possible type keys automatically
export type FieldTypes = keyof FieldPropsMap // This automatically gives 'input' | 'digits' | 'dropdown' | ...
export type FieldConfig<T extends FieldTypes> = {
  name: string
  fieldProps: {
    type: T
    disabled?: any
  } & FieldPropsMap[T] 
}
// export type FieldConfig<T extends FieldTypes = FieldTypes> = {
//   name: string
//   fieldProps: {
//     type: T
//     disabled?: any
//   } & (T extends keyof FieldPropsMap? FieldPropsMap[T]: FieldPropsMap['input'])
// }

export default FieldController