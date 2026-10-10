'use client'
import { MouseEventHandler, useState, type FC, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { DateFieldProps } from './TDateField'
import type { DayPickerLocale } from 'react-day-picker'
import clsx from 'clsx'
import { Controller } from 'react-hook-form'
import type { DateRange } from '@daypicker/react'
import type { RenderFC, DomRect } from '@ts/FormElements'
import { useFormElements } from '@hooks'
import { TextField, Text } from '@radix-ui/themes'
import { CrossCircledIcon, CalendarIcon } from '@radix-ui/react-icons'
import { DATE_FIELD_ROOT_ID } from '@constants'
import { DayPicker, faIR } from '@daypicker/persian'
import './DateField.css'
import '@daypicker/react/style.css'

const customLocale: DayPickerLocale = {
  ...faIR,
  code: faIR.code ?? 'fa-IR'
}

export const DateField: FC<DateFieldProps> = ({
  control,
  name,
  id,
  onChange,
  rules,
  clearCb,
  prefixIcon,
  prefix,
  color,
  onClick,
  pickerProps,
  clearable = false,
  label = '',
  className = '',
  classNameControl = '',
  disabled = false,
  size = '3',
  variant = 'surface',
  ...props
}) => {
  const [selected, setSelected] = useState<DateRange | undefined>()
  const [open, setOpen] = useState<boolean>(false)
  const [domRect, setDomRect] = useState<DomRect | null>(null)
  const [menuRoot, setMenuRoot] = useState<HTMLDivElement | null>(null)
  const fieldRef = useRef<HTMLDivElement>(null)

  const calculateDomRect = () => {
    if (fieldRef.current) {
      const client = fieldRef.current.getBoundingClientRect()
      setDomRect(() => ({
        width: `${client.width}px`,
        top: `${client.top + client.height}px`,
        left: `${client.x}px`
      }))
    }
  }

  const clickOuter: MouseEventHandler<HTMLDivElement> = (e) => {
    e?.preventDefault?.()
    setOpen(false)
  }

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
        const newChangeEvent = e

        field.onChange(newChangeEvent)
        onChange?.(newChangeEvent)
      }

      return (
        <div className="control">
          <TextField.Root
            className={clsx({ 'control__input--error': Boolean(fieldState?.invalid) })}
            name={name}
            type="text"
            size={size}
            variant={variant}
            id={selfId}
            value={field.value}
            color={ownColor}
            disabled={disabled}
            aria-invalid={fieldState.invalid}
            onChange={onChangeEvent}
            onClick={(e) => {
              e.stopPropagation()
              onClick?.(e)
              setOpen(true)
              calculateDomRect()
            }}
            {...props}
          >
            {Boolean(prefix) && (
              <TextField.Slot side="left" color={ownColor}>
                {prefix}
              </TextField.Slot>
            )}

            <TextField.Slot side="right" color={ownColor}>
              {enableClear() && <CrossCircledIcon color={ownColor} onClick={clear} />}
              <CalendarIcon color={ownColor} />
            </TextField.Slot>
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

  useEffect(() => {
    const el = document.getElementById(DATE_FIELD_ROOT_ID) as HTMLDivElement
    if (el) {
      setMenuRoot(el)
    }
  }, [])

  return (
    <>
      <div className={clsx('date-picker')} ref={fieldRef}>
        <Controller
          control={control}
          name={name}
          render={renderFC.render}
          rules={rules}
        />

        {Boolean(open && menuRoot) &&
          createPortal(
            <>
              <div className="date-field__overlay" onClick={clickOuter}></div>

              <div
                className="date-field__wrapper"
                style={{
                  width: domRect?.width,
                  top: domRect?.top,
                  left: domRect?.left
                }}
              >
                <DayPicker
                  mode="range"
                  className="date-field__day-picker"
                  locale={customLocale as any}
                  //@ts-ignore
                  selected={selected}
                  onSelect={setSelected as any}
                  {...pickerProps}
                />
              </div>
            </>,
            menuRoot as HTMLDivElement
          )}
      </div>
    </>
  )
}
