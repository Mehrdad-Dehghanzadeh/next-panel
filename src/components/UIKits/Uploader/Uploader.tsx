'use client'
import { ChangeEventHandler, useRef, useState, type FC } from 'react'
import type { UploaderProps } from './TUploader'
import type { RenderFC } from '@ts/FormElements'
import { useFormElements } from '@hooks'
import clsx from 'clsx'
import { Controller } from 'react-hook-form'
import { Button } from '@radix-ui/themes'
import { hasItem } from '@utils'
import { ImagePrev } from './ImagePrev'
import './Uploader.css'

export const Uploader: FC<UploaderProps> = ({
  control,
  name,
  title,
  children,
  id,
  onChange,
  rules,
  clearCb,
  className,
  color,
  radius = 'full',
  size = '3',
  variant = 'dashed',
  btnText = 'بارگذاری تصویر',
  disabled = false,
  clearable = true,
  ...props
}) => {
  const [hasFile, setHasFile] = useState<boolean>(false)
  const inputFileRef = useRef<HTMLInputElement>(null)

  const openUploader = () => {
    inputFileRef?.current?.click()
  }

  const changeFile: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (event) => {
    if (hasItem(event.target.files)) {
      setHasFile(true)
      const reader = new FileReader()
    }
    onChange?.(event)
  }

  const renderFC: RenderFC = {
    render({ field, fieldState }) {
      const { selfId, clear, enableClear, ownColor } = useFormElements({
        id,
        fieldState,
        field,
        color,
        clearable,
        disabled
      })

      return (
        <div className={clsx('uploader__wrapper', `uploader__wrapper-${variant}`)}>
          <input
            className="hidden"
            type="file"
            onChange={changeFile}
            ref={inputFileRef}
            hidden
            {...props}
          />
          {hasFile ? (
            <></>
          ) : (
            <>
              {Boolean(children) && <div className="uploader__content">{children}</div>}

              <Button
                size={size}
                className="uploader__btn"
                color={ownColor}
                variant="outline"
                type="button"
                disabled={disabled}
                onClick={openUploader}
                radius="full"
              >
                {btnText}
              </Button>
            </>
          )}
        </div>
      )
    }
  }

  return (
    <div className={clsx('uploader', className)}>
      {Boolean(title) && <strong className="uploader__title">{title}</strong>}
      <Controller control={control} name={name} render={renderFC.render} rules={rules} />
    </div>
  )
}
