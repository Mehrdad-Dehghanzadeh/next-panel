import { toJalaali } from 'jalaali-js'

export function price(
  val: number | string | null,
  currency: string = 'ریال',
  initialValue: number | string = 0
) {
  let value: number | string = initialValue
  if (val) {
    const int = val.toString().split('.')
    const str: string = int[0]
    value = str.startsWith('-')
      ? `${str.substring(1).replace(/(.)(?=(.{3})+$)/g, '$1,')}-`
      : str.replace(/(.)(?=(.{3})+$)/g, '$1,')

    if (int.length == 2) {
      value = `${value}.${int[1]}`
    }
  }

  return currency ? `${value} ${currency}` : `${value}`
}

/**
 * Roune number
 * ***********************************/
export function round(num: number) {
  if (num % 1 === 0) {
    return num
  }
  return Math.round(num * 100) / 100
}

/**
 * retrun value or havenot String
 * ***********************************/
export function haveNot(val: unknown) {
  return val ?? 'ندارد'
}

/**
 * Determine file size
 * ***********************************/
export function fileSize(val: number) {
  const size = val
  const kilobyte = 1024
  const megabyte = kilobyte * kilobyte

  if (size > megabyte) {
    return round(size / megabyte) + ' مگابایت'
  } else if (size > kilobyte) {
    return round(size / kilobyte) + ' کیلوبایت'
  } else if (size >= 0) {
    return size + ' بایت'
  }

  return 'N/A'
}

export function cartNumber(
  val: number | NumberString | string | null,
  separateChar: string = ' - '
) {
  return String(val)
    .split('')
    .reverse()
    .join('')
    .replace(/-/g, '')
    .replace(/\B(?=(\d{4})+(?!\d))/g, separateChar)
    .split('')
    .reverse()
    .join('')
}

export function convertNumbers2English(string: any) {
  return string
    .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (c: any) {
      return c.charCodeAt(0) - 1632
    })
    .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (c: any) {
      return c.charCodeAt(0) - 1776
    })
}

export function utcToJalaali(utc: string, hideTime: boolean = false): string {
  const str = utc.split('T')
  const date = str[0]?.split('-')
  const jDate = date ? toJalaali(Number(date[0]), Number(date[1]), Number(date[2])) : ''
  const time =
    !hideTime && str[1]?.split(':')
      ? `${str[1]?.split(':')[0]}:${str[1]?.split(':')[1]}`
      : ''
  //@ts-ignore
  const strDate = Boolean(jDate.jm && jDate.jy && jDate.jd)
    ? //@ts-ignore
      `${jDate.jy}/${jDate.jm}/${jDate.jd}`
    : ''

  return `${strDate}` + (time ? ` - ${time}` : '')
}

export function dateToJalaali(date: Date) {
  const c = toJalaali(date)
  const month = c.jm > 10 ? `${c.jm}` : `0${c.jm}`
  const day = c.jd > 10 ? `${c.jd}` : `0${c.jd}`

  return `${c.jy}/${month}/${day}`
}
