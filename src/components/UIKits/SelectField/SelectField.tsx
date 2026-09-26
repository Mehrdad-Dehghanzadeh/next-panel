'use client'
import { useEffect, useLayoutEffect, useState, type FC } from 'react'
import { type SelectFieldProps } from './TSelectField'
import clsx from 'clsx'
import type { RenderFC } from '@ts/FormElements'
import { Controller } from 'react-hook-form'
import { useFormElements } from '@hooks'
import { Select, Text } from '@radix-ui/themes'
import './SelectField.css'

export const SelectField: FC<SelectFieldProps> = ({
  control,
  name,
  id,
  onChange,
  rules,
  scrollTop,
  itemHoc,
  clearable,
  noItemMessage,
  color,
  placeholder,
  clearCb,
  loading = false,
  label = '',
  className = '',
  classNameControl = '',
  fieldTextClassName = '',
  options = [],
  disabled = false,
  size = '3',
  variant = 'surface',
  ...props
}) => {
  const renderFC: RenderFC = {
    render({ field, fieldState }) {
      const [defaultValue, setDefaultValue] = useState<string>(field.value)
      const { selfId, ownColor, enableClear, clear } = useFormElements({
        id,
        color,
        clearable,
        clearCb,
        disabled,
        field,
        fieldState
      })

      const onValueChange = (e: string) => {
        field?.onChange?.(e)
        onChange?.(e)
      }

      useLayoutEffect(() => {
        setDefaultValue(field.value)
      }, [])

      return (
        <Select.Root
          defaultValue={defaultValue}
          size={size}
          name={name}
          onValueChange={onValueChange}
          {...props}
        >
          <Select.Trigger
            className={clsx(
              { 'control__input--error': Boolean(fieldState?.invalid) },
              'select-field__trigger'
            )}

            color={ownColor}
            placeholder={placeholder}
            variant={variant}
          />
          <Select.Content position="popper">
            {options.map((el: SelectOption) => (
              <Select.Item
                value={String(el?.value)}
                key={`select-item-${selfId}-${String(el?.value)}`}
              >
                {itemHoc ? itemHoc(el) : <span>{el?.title}</span>}
              </Select.Item>
            ))}
          </Select.Content>
          {fieldState.invalid && (
            <Text as="span" color="red" className="control__error-message">
              {fieldState.error?.message || ''}
            </Text>
          )}
        </Select.Root>
      )
    }
  }

  return (
    <div className={clsx('select-field')}>
      <Controller control={control} name={name} render={renderFC.render} rules={rules} />
    </div>
  )
}
