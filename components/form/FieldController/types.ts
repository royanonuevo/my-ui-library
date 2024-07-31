type FieldConfig = {
  name: string | null,
  fieldProps: {
    type: string,
    label: string,
    [key: string]: any
  },
  disabledWhen: null | Function,
  mandatoryWhen: null | Function,
  validation: Object,
  [key: string]: any
}

export type FieldControllerProps = {
  name: string,
  fieldArrayName?: string | null,
  fieldsConfig: FieldConfig[],
  hookForm: any
}