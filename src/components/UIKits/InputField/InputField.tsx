'use client'
import type { InputFieldProps } from './TInputField'
import { RenderFC } from '@/ts/FormElements'
import { useFormElements } from '@hooks'
import { type FC } from 'react'
import clsx from 'clsx'
import { Controller } from 'react-hook-form'
import { TextField, Text } from '@radix-ui/themes'
import { CrossCircledIcon } from '@radix-ui/react-icons'

export const InputField: FC<InputFieldProps> = ({
  control,
  name,
  id,
  onChange,
  rules,
  convertValue,
  clearCb,
  prefixIcon,
  suffix,
  prefix,
  color,
  clearable = false,
  type = 'text',
  label = '',
  className = '',
  classNameControl = '',
  disabled = false,
  size = '3',
  variant = 'surface',
  ...props
}) => {
  const renderFC: RenderFC = {
    render({ field, fieldState }) {
      const { selfId, ownColor, clear, enableClear } = useFormElements({
        id,
        color,
        fieldState,
        field,
        clearable,
        disabled
      })

      const onChangeEvent: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const newChangeEvent = convertValue
          ? {
              ...e,
              target: { ...e.target, value: convertValue(e.target.value) }
            }
          : e

        field.onChange(newChangeEvent)
        onChange?.(newChangeEvent)
      }

      return (
        <div className="control">
          <TextField.Root
            className={clsx({ 'control__input--error': Boolean(fieldState?.invalid) })}
            name={name}
            type={type}
            size={size}
            variant={variant}
            id={selfId}
            value={field.value}
            color={ownColor}
            disabled={disabled}
            aria-invalid={fieldState.invalid}
            onChange={onChangeEvent}
            {...props}
          >
            {Boolean(prefix) && (
              <TextField.Slot side="left" color={ownColor}>
                {prefix}
              </TextField.Slot>
            )}

            {enableClear() ? (
              <TextField.Slot side="right" color={ownColor} className="pointer-none">
                <CrossCircledIcon color={ownColor} onClick={clear} />
              </TextField.Slot>
            ) : (
              Boolean(suffix) && (
                <TextField.Slot side="right" color={ownColor}>
                  {suffix}
                </TextField.Slot>
              )
            )}
          </TextField.Root>

          {fieldState.invalid && (
            <Text as="span" color="red" className="control__error-message">
              {fieldState.error?.message || ''}
            </Text>
          )}
        </div>
      )
    }
  }

  return (
    <div className={clsx('input-field', className)}>
      <Controller control={control} name={name} render={renderFC.render} rules={rules} />
    </div>
  )
}
