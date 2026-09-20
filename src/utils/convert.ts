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
