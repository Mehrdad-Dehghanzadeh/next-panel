'use client'
import type { TextAreaFieldProps } from './TTextAreaField'
import { type FC } from 'react'
import { RenderFC } from '@/ts/FormElements'
import { TextArea } from '@radix-ui/themes'
import { useFormElements } from '@hooks'
import clsx from 'clsx'
import { Controller } from 'react-hook-form'

export const TextAreaField: FC<TextAreaFieldProps> = ({
  control,
  name,
  id,
  onChange,
  rules,
  convertValue,
  color,
  clearable = false,
  placeholder = '',
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
      const { selfId, ownColor } = useFormElements({
        id,
        color,
        fieldState,
        field,
        disabled
      })

      const onChangeEvent: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
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
          <TextArea
            className={clsx({ 'control__input--error': Boolean(fieldState?.invalid) })}
            name={name}
            size={size}
            placeholder={placeholder}
            variant={variant}
            value={field.value}
            disabled={disabled}
            onChange={onChangeEvent}
            aria-invalid={fieldState.invalid}
            color={ownColor}
            id={selfId}
            {...props}
          />
        </div>
      )
    }
  }
  return (
    <div className={clsx('text-area-field', className)}>
      <Controller control={control} name={name} render={renderFC.render} rules={rules} />
    </div>
  )
}
