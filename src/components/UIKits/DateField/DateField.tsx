'use client'
import { MouseEventHandler, useState, type FC, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { DateFieldProps } from './TDateField'
import type { DayPickerLocale } from 'react-day-picker'
import clsx from 'clsx'
import { Controller } from 'react-hook-form'
import type { DateRange } from '@daypicker/react'
import type { RenderFC } from '@ts/FormElements'
import { useDomRect, useFormElements } from '@hooks'
import { TextField, Text } from '@radix-ui/themes'
import { CrossCircledIcon, CalendarIcon } from '@radix-ui/react-icons'
import { DATE_FIELD_ROOT_ID } from '@constants'
import { DayPicker, faIR } from '@daypicker/persian'
import { dateToJalaali } from '@utils'
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
  const [menuRoot, setMenuRoot] = useState<HTMLDivElement | null>(null)

  const { elRef, domRect, calculateDomRect, clearDomRect } = useDomRect()

  const clickOuter: MouseEventHandler<HTMLDivElement> = (e) => {
    e?.preventDefault?.()
    setOpen(false)
    clearDomRect()
  }

  useEffect(() => {
    const el = document.getElementById(DATE_FIELD_ROOT_ID) as HTMLDivElement
    if (el) {
      setMenuRoot(el)
    }
  }, [])

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
        onChange?.(e)
      }

      const onClickTextField: MouseEventHandler<HTMLInputElement> = (e) => {
        e.stopPropagation()
        onClick?.(e)
        setOpen(true)
        calculateDomRect()
      }

      const convertValue = () => {
        let val = ''

        if (selected?.from && selected?.to) {
          const from = dateToJalaali(selected?.from)
          const to = dateToJalaali(selected?.to)
          val = `${from} - ${to}`
        }

        return val
      }

      const setValue = () => {
        field.onChange([selected?.from?.toISOString(), selected?.to?.toISOString()])
      }

      useEffect(() => {
        setValue()
      }, [selected])

      return (
        <div className="control">
          <TextField.Root
            className={clsx({ 'control__input--error': Boolean(fieldState?.invalid) })}
            name={name}
            type="text"
            size={size}
            variant={variant}
            id={selfId}
            value={convertValue()}
            color={ownColor}
            disabled={disabled}
            aria-invalid={fieldState.invalid}
            onChange={onChangeEvent}
            onClick={onClickTextField}
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

  return (
    <>
      <div className={clsx('date-picker')} ref={elRef}>
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
