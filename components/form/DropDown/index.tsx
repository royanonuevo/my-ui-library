'use client'

import React, { useState, useRef } from 'react'
import { 
  SelectOption, 
  DropDownProps, 
  RETURN_TYPE_ARRAY, 
  RETURN_TYPE_VALUE, 
  RETURN_TYPE_OBJECT
} from './types'
import Controller from './Controller'
import { cn } from '@/lib/utils'
import { isEqual, containsObject } from '../shared/utils'
import Label from '../shared/Label'
import ErrorText from '../shared/ErrorText'

export type { SelectOption, DropDownProps }

export default function DropDown ({
  returnType,
  removeOptionWhenSelected = true, // applicable only in multipleSelection = true TODO
  disableToggleOnSelectedOption = false, // applicable only in multipleSelection = false TODO
  options = [],
  optionOneLiner = true,
  label,
  value,
  placeholder = 'Select an option',
  noOptionsLabel = 'No options available',
  error = '',
  onChange,
  onBlur,
  disabled = false,
  readOnly = false,
  maxOptionsHeight = '15rem',
  styleController,
  styleLabel = { cursor: 'default'}
}: DropDownProps) {
  const controllerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
  const [isFocusController, setFocusController] = useState<boolean>(false)
  const hasError = Boolean(error)
  let filteredOptions = [...options]

  if (returnType === RETURN_TYPE_ARRAY && removeOptionWhenSelected) {
    const listOfValues = [...value]
    filteredOptions = filteredOptions.filter(o => !containsObject(listOfValues, o))
  }

  if (filteredOptions.length === 0) {
    filteredOptions.push({ label: noOptionsLabel, value: ''})
  }

  const focusController = () => {
    setFocusController(true)
    controllerRef.current?.focus()
  }
  const closeOptions = () => {
    setIsOpen(false)
    setHighlightedIndex(null)
  }

  const openOptions = () => {
    if (disabled || readOnly) return
    setIsOpen(prev => !prev)
  }

  const changeOption = (option: SelectOption) => {
    onBlur && onBlur()

    if (filteredOptions.length === 1 && option?.label === noOptionsLabel) return

    if (returnType === RETURN_TYPE_VALUE) {
      if (disableToggleOnSelectedOption && isEqual(option?.value, value)) return
      onChange?.(!isEqual(option?.value, value)? option?.value : '')
    }

    if (returnType === RETURN_TYPE_OBJECT) {
      const isEqualValue = isEqual(option, value)
      if (disableToggleOnSelectedOption && isEqualValue) return
      onChange?.(!isEqualValue? option : undefined)
    }

    if (returnType === RETURN_TYPE_ARRAY) {
      if (containsObject(value, option)) {
        onChange?.(value.filter(o => !isEqual(o, option)))
      } else {
        onChange?.([...value, option])
      }
    } 
  }

  const isOptionSelected = (option: SelectOption) => {
    if (!options.length) return false

    if (returnType === RETURN_TYPE_VALUE) {
      return isEqual(option?.value, value)
    }

    if (returnType === RETURN_TYPE_OBJECT) {
      return isEqual(option, value)
    }
    
    if (returnType === RETURN_TYPE_ARRAY) {
      return containsObject(value, option)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch(e.code) {
      case 'Space':
        openOptions()
        break
      case 'Enter':
        if (isOpen && highlightedIndex !== null) {
          changeOption(filteredOptions[highlightedIndex])
          closeOptions()
          focusController()
        }
        break
      case 'Escape':
        closeOptions()
        break
      case 'ArrowUp':
      case 'ArrowDown': {
        if (!isOpen) {
          openOptions()
          break
        }

        const newValue = (highlightedIndex !== null? highlightedIndex : -1) + (e.code === 'ArrowDown'? 1 : -1)
        if (newValue >= 0 && newValue < filteredOptions.length) {
          setHighlightedIndex(newValue)
        }
        break
      } 
      case 'Tab': {
        closeOptions()
        setFocusController(false)
        onBlur && onBlur()
        break
      }
    }
  }

  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      closeOptions()
      setFocusController(false)
      onBlur && onBlur()
    }
  }

  return (
    <div 
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      className={cn(
        'relative w-full text-base '
      )}
    >
      {
        label? (
          <Label
            useLabelTag={false}
            label={label}
            disabled={disabled}

            onClick={() => focusController()}
            tabIndex={-1} // tricks: so that onKeyDown will work when this is clicked
            style={styleLabel}
          /> 
        ) : ''
      }

      <Controller 
        value={value}
        options={options}
        placeholder={placeholder}
        returnType={returnType}
        changeOption={changeOption}
        ref={controllerRef}
        handleClick={() => {
          setFocusController(true)
          openOptions()
        }}
        isFocusController={isFocusController}
        styleController={styleController}
        hasError={hasError}
        disabled={disabled}
        readOnly={readOnly}
      />
      
      { hasError? (
        <ErrorText>{ error }</ErrorText>
      ): ''}

      {/* Options List */}
      <ul 
        className={cn(
          'w-full bg-white',
          'absolute z-[51] top-[100%] left-0 m-0 p-0 rounded-md ui-border mt-2 overflow-y-auto app-box-shadow',
          'hidden',
          {
            'block': isOpen
          }
        )} 
        tabIndex={-1} 
        style={{
          maxHeight: maxOptionsHeight, 
          // boxShadow: 'rgb(13 22 38 / 10%) 0px 0px 0px 1px, rgb(13 22 38 / 10%) 0px 4px 11px'
        }}
      >
        {
          filteredOptions.map((option, index) => {
            const isSelected = isOptionSelected(option)
            return (
              <li 
                key={option.value} 
                onClick={(e) => {
                  e.stopPropagation()
                  changeOption(option)
                  closeOptions()
                  focusController()
                }}  
                onMouseEnter={() => setHighlightedIndex(index)}
                className={cn(
                  'cursor-pointer break-all p-[16px] text-sm',
                  {
                    'bg-gray-100 text-black ': isSelected,
                    'bg-gray-100 text-black': highlightedIndex === index,
                    'whitespace-nowrap break-normal overflow-hidden text-ellipsis': optionOneLiner
                  }
                )}
              >
                { isSelected? (
                  <span className={cn(
                    'inline-block rotate-45 h-[12px] w-[7px] mr-2',
                    'border-b-[2px] border-solid border-b-primary',
                    'border-r-[2px] border-r-primary',
                  )} />
                ) : ''}
                { option.label }
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

