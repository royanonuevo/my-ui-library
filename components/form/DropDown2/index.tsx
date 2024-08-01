'use client'

import React, { useState, useRef, useEffect } from 'react'
import { SelectOption, SelectProps } from './types'
import Controller from './Controller'
import { cn } from '@/lib/utils'
import { isEqual, containsObject, strToLower } from './utils'
import Input from '@/components/form/Input'
import { CheckBox } from '@/components/form'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { X } from 'lucide-react'

export type { SelectOption }

export default function DropDown2 ({
  multiple,
  removeOptionWhenSelected = true,
  options = [],
  optionOneLiner = true,
  label,
  value,
  placeholder = 'Select an option',
  noOptionsLabel = 'No options available',
  error = '',
  onChange,
  onBlur,
  disabled,
  readOnly,
  maxOptionsHeight = '15rem',
  styleController
}: SelectProps) {
  let filteredOptions = [...options]
  
  if (multiple && removeOptionWhenSelected) {
    const listOfValues = [...value]
    filteredOptions = filteredOptions.filter(o => !containsObject(listOfValues, o))
  }

  if (filteredOptions.length === 0) {
    filteredOptions.push({ label: noOptionsLabel, value: '', id: 0})
  }

  const inputRef = useRef<HTMLInputElement>(null)
  const controllerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
  const [isFocusController, setFocusController] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchResults, setSearchResults] = useState<SelectOption[]>(filteredOptions)
  const hasError = Boolean(error)
  

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

  const isIdInArrayOfObj = (option: SelectOption, list: SelectOption[])  =>{
    return list.find((l: SelectOption) => l.id === option.id)
  }

  const changeOption = (option: SelectOption) => {
    onBlur && onBlur()

    if (filteredOptions.length === 1 && option?.label === noOptionsLabel) return

    if (multiple) {
      if (isIdInArrayOfObj(option, value)) {
        const newValue = [...value].filter((v: SelectOption) => v.id !== option.id)
        onChange?.(newValue)
      } else {
        if (Array.isArray(value)){ 
          onChange?.([...value, option])
        }
      }
    } else {
      onChange?.(!isEqual(option, value)? option : undefined)
    }
  }

  const isOptionSelected = (option: SelectOption) => {
    return multiple? isIdInArrayOfObj(option, value) : isEqual(option, value)
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

  useEffect(() => {
    let results = [...filteredOptions]

    if (searchTerm) {
      results = results.filter((r: SelectOption) => {
        const label = strToLower(r.label)
        return label.includes(searchTerm)
      })
    } 
    setSearchResults(results)
  }, [searchTerm]) // eslint-disable-line

  useEffect(() => {
    if (isOpen) {
      // inputRef?.current?.focus()
    }
  }, [isOpen])

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
          <div 
            className={cn(
              'mb-2 block cursor-default focus:outline-none text-sm font-semibold',
              '', {
                'text-grey-300': disabled
              }
            )}
            onClick={() => focusController()}
            tabIndex={-1} // tricks: so that onKeyDown will work when this is clicked
          >
            { label }
          </div>
        ): ''
      }

      <Controller 
        value={value}
        placeholder={placeholder}
        multiple={multiple}
        changeOption={changeOption}
        onChange={onChange}
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
      
      { hasError && (<span className='text-xs text-error mt-1'>{ error } </span>) }
      
      <div
        className={cn(
          'w-full bg-white',
          'absolute z-[51] top-[100%] left-0 m-0 p-0 rounded-md ui-border mt-2',
          'hidden',
          {
            'block': isOpen
          }
        )} 
        tabIndex={-1} // tricks: so that onKeyDown will work when this is clicked
        style={{
          boxShadow: 'rgb(13 22 38 / 10%) 0px 0px 0px 1px, rgb(13 22 38 / 10%) 0px 4px 11px'
        }}
      >
        <div className=''>
          <Input
            ref={inputRef}
            error={error}
            value={searchTerm}
            onChange={(e: any) => {
              const val = e.target.value
              setSearchTerm(String(val))
            }}
            // onBlur={handleBlur}
            // onFocus={handleFocus}
            placeholder='Search'
            disabled={disabled}
            appendLeftContent={
              // <FontAwesomeIcon 
              //   icon={faMagnifyingGlass}
              //   className={cn('text-md', {
              //     'cursor-not-allowed fill-red disabled:opacity-60': disabled
              //   })}
              // />
              'magnify'
            }
            appendRightContent={
              <X 
                className={cn('h-4 w-4 shrink-0 cursor-pointer')} 
                onClick={() => setSearchTerm('')} 
              />
            }
            readOnly={false}
            showErrorMessages={false}
            variantStyle='dropdown-search'
          />
        </div>
        {/* Options List */}
        <ul 
          className={cn(
            'overflow-y-auto',
          )} 
          style={{
            maxHeight: maxOptionsHeight
          }}
        >
          {
            searchResults.map((option, index) => {
              const isSelected = isOptionSelected(option)? true : false
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
                    'cursor-pointer break-all px-4 py-2 flex items-center',
                    {
                      // 'bg-grey-200 text-system-black pointer-events-none': isSelected,
                      'bg-grey-200 text-system-black': highlightedIndex === index,
                      'whitespace-nowrap break-normal overflow-hidden text-ellipsis': optionOneLiner
                    }
                  )}
                >
                  <CheckBox 
                    label={option.label}
                    isChecked={isSelected}
                    readOnly={true}
                    useLabelContainer={false}
                  />
                </li>
              )
            })
          }

          {
            searchResults.length === 0 && (
              <li className='cursor-pointer break-all p-4 flex items-center text-grey-400'>
                No Results Found
              </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

