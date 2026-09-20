import { Mutex } from '@utils/mutex'
import { useEffect, useRef, useState } from 'react'

type Mut = {
  mutex?: boolean
}

type TConfig<T> = {
  eventName: string
  defaultDetails?: Partial<T & Mut>
}

let mutex: null | Mutex = null

export function useRootPopUp<TDetails>({ eventName, defaultDetails }: TConfig<TDetails>) {
  const [show, setShow] = useState<boolean>(false)
  const [detail, setDetail] = useState<(TDetails & Mut) | null>(null)

  const elRef = useRef<HTMLDivElement>(null)
  const isSetEvent = useRef<boolean>(false)

  const eventCB = async (e: any) => {
    await mutex?.wait()
    setShow(true)
    setDetail(() => ({ ...defaultDetails, ...e.detail }))

    if (e?.detail?.mutex) {
      mutex = new Mutex('prompt')
    }
  }

  const eventHandler = async () => {
    if (!isSetEvent?.current) {
      elRef?.current?.addEventListener(eventName, eventCB)
      isSetEvent.current = true
    }
  }

  const mutexHandle = () => {
    if (!show) {
      mutex?.resolve()

      setTimeout(() => {
        mutex = null
      }, 0)
    }
  }

  const handelShow = () => {
    if (!show) {
      setDetail(null)
    }
  }

  useEffect(() => {
    mutexHandle()
    handelShow()
  }, [show])

  useEffect(() => {
    eventHandler()
  }, [])

  return {
    detail,
    show,
    setShow,
    elRef
  }
}
