import { price } from '@utils'
import { isCartNumber } from './validations/cartNumber'
import { isPersianDate } from './validations/date'
import { isEmail } from './validations/email'
import { isIban } from './validations/iban'
import {
  isRealNationalCode,
  isLegalNationalCode,
  isNationalCode
} from './validations/nationalCode'
import { checkMobile, checkPhone } from './validations/phone'
import { isPostalCode } from './validations/postalCode'

export function cartNumberRule(val: string | null): boolean | string {
  return !val || isCartNumber(val) || 'شماره کارت اشتباه است'
}

export function persianDateRule(val: string | null): boolean | string {
  return !val || isPersianDate(val) || 'فرمت تاریخ فارسی صحیح نیست باید yyyy/mm/dd باشد'
}

export function emailRule(val: string | null): string | boolean {
  return !val || isEmail(val) || 'لطفا فرمت ایمیل صحیح وارد نمایید'
}

export function ibanRule(val: string | null): string | boolean {
  return !val || isIban(val) || 'شماره شبا نادرست است'
}

export function realNationalCodeRule(val: string | null): string | boolean {
  return !val || isRealNationalCode(val) || 'کد ملی معتبر نیست'
}

export function legalNationalCodeRule(val: string | null): boolean | string {
  return !val || isLegalNationalCode(val) || 'شناسه ملی معتبر نیست'
}

export function nationalCodeRule(val: string | null): boolean | string {
  return !val || isNationalCode(val) || 'کد/شناسه ملی معتبر نیست'
}

export function phoneRule(val: string | null): boolean | string {
  return !val || checkPhone(val) || 'شماره تماس معتبر نمی باشد'
}

export function mobileRule(val: string | null): boolean | string {
  return !val || checkMobile(val) || 'شماره موبایل نادرست است'
}

export function emailOrMobileRule(val: string | null): boolean | string {
  return !val || isEmail(val) || checkMobile(val) || 'شماره موبایل یا ایمیل صحیح نمی باشد'
}

export function equalRule(equalValue: string | number | null, name: string) {
  return (val: string | number | null): boolean | string =>
    !val || equalValue == val || 'مقدار وارد شده با {name} یکسان نیست'
}

export function maxRule(value: number) {
  return {
    value,
    message: `مقدار نمیتواند بیشتر از ${value} باشد`
  }
}

export function maxPriceRule(value: number, unit?: string) {
  return {
    value,
    message: `مقدار نمیتواند بیشتر از ${price(value, unit)} باشد`
  }
}

export function minRule(value: number) {
  return {
    value,
    message: `مقدار نمیتواند کمتر از ${value} باشد`
  }
}

export function minPriceRule(value: number, unit?: string) {
  return {
    value,
    message: `مقدار نمیتواند کمتر از ${price(value, unit)} باشد`
  }
}

export function maxLengthRule(value: number) {
  return {
    value,
    message: `مقدار نمیتواند بیشتر از ${value} کاراکتر باشد`
  }
}

export function minLengthRule(value: number) {
  return { value, message: `مقدار نمیتواند کمتر از ${value} کاراکتر باشد` }
}

export function patternRule(value: RegExp) {
  return { value, message: 'فرمت ورودی نادرست است' }
}

export function requiredRule(value = true) {
  return { value, message: 'لطفا مقدار را وارد نمایید' }
}

export function postalCodeRule(value: string) {
  return !value || isPostalCode(value) || 'لطفا کدپستی صحیح را وارد نمایید'
}
