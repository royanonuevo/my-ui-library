import { 
  Input,
  // CheckBox,
  DropDown,
  DropDown2,
  // TextArea,
  // Slider,
  // RadioButtons,
  // SearchTags
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
    const arrayField: any = fieldsConfig.find(f => f.name === arrayName)
    if (arrayField) {
      const childFields: any[] = arrayField?.validation.of
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
      isFieldDisabled = otherFieldProps.disabled(values, name)
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
    case 'dropdown': 
      return (
        <Controller
          name={fieldArrayName || name}
          control={control}
          render={({ field }) => {
            if (field.ref) {
              // @ts-ignore
              delete field.ref 
            }

            return (
              <DropDown 
                {...otherFieldProps}
                // {...field}
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
                // disabled={isFieldDisabled}
              />
            )
          }}
        />
      )
    
    case 'dropdown2': 
      return (
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            if (field.ref) {
              // @ts-ignore
              delete field.ref 
            }

            return (
              <DropDown2
                {...otherFieldProps}
                // {...field}
                label={label}
                options={getOptions()}
                value={value}
                onChange={(o: any) => {
                  setValue(name, o, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                }}
                onBlur={field.onBlur}
                error={errorText}
              />
            )
          }}
        />
      )

    // case 'checkbox': 
    //   return (
    //     <CheckBox 
    //       {...otherFieldProps}
    //       name={name}
    //       label={label}
    //       error={errorText}
    //       register={register}
    //     />
    //   )

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

    // case 'radio': 
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
    //           <RadioButtons 
    //             {...otherFieldProps}
    //             name={name}
    //             label={label}
    //             options={fieldProps.options}
    //             value={value}
    //             onChange={(o: any) => {
    //               setValue(name, o, {
    //                 shouldValidate: true,
    //                 shouldDirty: true
    //               })
    //             }}
    //             error={errorText}
    //           />
    //         )
    //       }}
    //     />
    //   )

    // case 'textarea': 
    //     return (
    //       <TextArea 
    //         {...otherFieldProps}
    //         name={name}
    //         fieldArrayName={fieldArrayName}
    //         label={label}
    //         error={errorText}
    //         register={register}
    //         rows={otherFieldProps?.rows || 3}
    //       />
    //     )

    default:
      return (
        <Input 
          {...otherFieldProps}
          type={type}
          name={name}
          value={value}
          fieldArrayName={fieldArrayName}
          label={label}
          error={errorText}
          register={register}
        />
      )
  }
}

export default FieldController