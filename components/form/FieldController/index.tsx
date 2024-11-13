import { 
  Input,
  Digits,
  TextArea,
  CheckBox,
  DropDown,
  // DropDown2,
  // Slider,
  RadioGroup,
  // SearchTags

  TYPE_DIGITS,
  TYPE_TEXTAREA,
  TYPE_DROPDOWN,
  TYPE_CHECKBOX,
  TYPE_RADIO_GROUP
} from '@/components/form'
import { FieldControllerProps } from './types'
import { Controller } from 'react-hook-form'

const FieldController = ({
  name,
  fieldArrayName,
  fieldsConfig,
  hookForm
}: FieldControllerProps) => {
  let fieldConfig
  let fieldArrayConfig: any
  
  if (fieldArrayName) {
    const splitName = fieldArrayName.split('.')
    const arrayName = splitName[0]
    const arrayChildName = splitName[2]
    fieldArrayConfig = {
      name: arrayName,
      index: splitName[1],
      child: arrayChildName
    }
    const parentField: any = fieldsConfig.find(f => f.name === arrayName)

    if (parentField) {
      const childFields: any[] = parentField?.childFields
      fieldConfig = childFields.find((aF: any) => aF.name === arrayChildName)
      if (!fieldConfig) {
        return <>{`Config for '${name}' not found.`}</>
      }
    }
  } else {
    fieldConfig = fieldsConfig.find(f => f.name === name)
    if (!fieldConfig) {
      return <>{`Config for '${name}' not found.`}</>
    }
  }

  const { fieldProps } = fieldConfig
  const { type, label, options, ...otherFieldProps } = fieldProps
  const { register, watch, getValues, setValue, control, formState: { errors } } = hookForm
 
  const value = getValues(fieldArrayName || name)
  let errorText = ''

  if (fieldArrayName) {
    errorText = errors?.[fieldArrayConfig.name]?.[fieldArrayConfig.index]?.[fieldArrayConfig?.child]?.message || ''
  } else {
    errorText = errors[name]?.message || ''
  }

  let isFieldDisabled = false

  // ##### Disabled thing
  if ('disabled' in otherFieldProps) {
    if (typeof otherFieldProps.disabled === 'function') {
      const values = watch()
      let paramIndex = null
      let paramName = name

      if (fieldArrayName) {
        paramIndex = fieldArrayConfig.index
        paramName = fieldArrayConfig.name
      }

      isFieldDisabled = otherFieldProps.disabled(values, paramName, paramIndex)
    } else {
      isFieldDisabled = otherFieldProps.disabled
    }
  }
  otherFieldProps.disabled = isFieldDisabled
  // ##### End disabled thing

  
  const getOptions = () => {
    if (Array.isArray(options)) return options

    if (typeof options === 'string') {
      // if stored in redux/context you can return here
    }

    return []
  }

  switch (type) {
    case TYPE_DROPDOWN: 
      return (
        <Controller
          name={fieldArrayName || name}
          control={control}
          render={({ field }) => {
            return (
              <DropDown 
                {...otherFieldProps}
                label={label}
                options={getOptions()}
                value={value}
                onChange={(o: any) => {
                  const keyName = fieldArrayName || name
                  setValue(keyName, o, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                }}
                onBlur={field.onBlur}
                error={errorText}
                disabled={isFieldDisabled}
              />
            )
          }}
        />
      )
    
    // case 'dropdown2': 
    //   return (
    //     <Controller
    //       name={name}
    //       control={control}
    //       render={({ field }) => {
    //         if (field.ref) {
    //           // @ts-ignore
    //           delete field.ref 
    //         }

    //         return (
    //           <DropDown2
    //             {...otherFieldProps}
    //             // {...field}
    //             label={label}
    //             options={getOptions()}
    //             value={value}
    //             onChange={(o: any) => {
    //               setValue(name, o, {
    //                 shouldValidate: true,
    //                 shouldDirty: true
    //               })
    //             }}
    //             onBlur={field.onBlur}
    //             error={errorText}
    //           />
    //         )
    //       }}
    //     />
    //   )

    case TYPE_CHECKBOX: 
      return (
        <Controller
          name={fieldArrayName || name}
          control={control}
          render={({ field }) => {
            return (
              <CheckBox 
                label={label}
                value={value}
                options={options || []}
                onChange={(o: any) => {
                  const keyName = fieldArrayName || name
                  setValue(keyName, o, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                }}
                onBlur={field.onBlur}
                error={errorText}
                disabled={isFieldDisabled}
              />
            )
          }}
        />
      )

    case TYPE_RADIO_GROUP: 
      return (
        <Controller
          name={fieldArrayName || name}
          control={control}
          render={({ field }) => {
            return (
              <RadioGroup 
                label={label}
                value={value}
                options={options || []}
                onChange={(o: any) => {
                  const keyName = fieldArrayName || name
                  setValue(keyName, o, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                }}
                onBlur={field.onBlur}
                error={errorText}
                disabled={isFieldDisabled}
              />
            )
          }}
        />
      )
      

    // case 'slider': 
    //   return (
    //     <Controller
    //       name={name}
    //       control={control}
    //       render={({ field }) => {
    //         if (field.ref) {
    //           // @ts-ignore
    //           delete field.ref 
    //         }

    //         return (
    //           <Slider 
    //             label={label}
    //             error={errorText}
    //             value={value}
    //             onChange={(o: any) => {
    //               setValue(name, o, {
    //                 shouldValidate: true,
    //                 shouldDirty: true
    //               })
    //             }}
    //             disabled={otherFieldProps.disabled}
    //             sliderProps={fieldProps?.sliderProps}
    //           />
    //         )
    //       }}
    //     />
    //   )
    
    // case 'search-tags':
    //   return (
    //     <Controller
    //       name={name}
    //       control={control}
    //       render={({ field }) => {
    //         if (field.ref) {
    //           // @ts-ignore
    //           delete field.ref 
    //         }
    //         return (
    //           <SearchTags 
    //             {...otherFieldProps}
    //             label={label}
    //             value={value}
    //             onChange={(o: any) => {
    //               setValue(name, o, {
    //                 shouldValidate: true,
    //                 shouldDirty: true
    //               })
    //             }}
    //             onBlur={field.onBlur}
    //             options={getOptions()}
    //             error={errorText}
    //           />
    //         )
    //       }}
    //     />
    //   )

    case TYPE_TEXTAREA: 
        return (
          <TextArea 
            {...otherFieldProps}
            name={fieldArrayName || name}
            label={label}
            error={errorText}
            register={register}
          />
        )

    case TYPE_DIGITS:
      return (
        <Controller
          name={fieldArrayName || name}
          control={control}
          render={({ field }) => {
            return (
              <Digits 
                {...otherFieldProps}
                label={label}
                value={value}
                onChange={(e: any) => {
                  const value = e.target.value
                  const keyName = fieldArrayName || name
                  setValue(keyName, value, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                }}
                onBlur={field.onBlur}
                error={errorText}
                disabled={isFieldDisabled}
              />
            )
          }}
        />
      )

    default:
      return (
        <Input 
          {...otherFieldProps}
          type={type}
          name={fieldArrayName || name}
          value={value}
          label={label}
          error={errorText}
          register={register}
        />
      )
  }
}

export default FieldController