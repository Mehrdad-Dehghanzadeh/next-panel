import { $t } from '@locales'
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
import { price } from '@utils'
import { isPostalCode } from './validations/postalCode'

export function cartNumberRule(val: string | null): boolean | string {
  return !val || isCartNumber(val) || $t('validations.cartNumber')
}

export function persianDateRule(val: string | null): boolean | string {
  return !val || isPersianDate(val) || $t('validations.persainDate')
}

export function emailRule(val: string | null): string | boolean {
  return !val || isEmail(val) || $t('validations.email')
}

export function ibanRule(val: string | null): string | boolean {
  return !val || isIban(val) || $t('validations.iban')
}

export function realNationalCodeRule(val: string | null): string | boolean {
  return !val || isRealNationalCode(val) || $t('validations.realNationalCode')
}

export function legalNationalCodeRule(val: string | null): boolean | string {
  return !val || isLegalNationalCode(val) || $t('validations.legalNationalCode')
}

export function nationalCodeRule(val: string | null): boolean | string {
  return !val || isNationalCode(val) || $t('validations.nationalCode')
}

export function phoneRule(val: string | null): boolean | string {
  return !val || checkPhone(val) || $t('validations.phone')
}

export function mobileRule(val: string | null): boolean | string {
  return !val || checkMobile(val) || $t('validations.mobile')
}

export function emailOrMobileRule(val: string | null): boolean | string {
  return !val || isEmail(val) || checkMobile(val) || $t('validations.emailOrMobile')
}

export function equalRule(equalValue: string | number | null, name: string) {
  return (val: string | number | null): boolean | string =>
    !val || equalValue == val || $t('validations.equal', { name })
}

export function maxRule(value: number) {
  return {
    value,
    message: $t('validations.max_value', { max_value: value })
  }
}

export function maxPriceRule(value: number, unit?: string) {
  return {
    value,
    message: $t('validations.max_value', { max_value: price(value) })
  }
}

export function minRule(value: number) {
  return {
    value,
    message: $t('validations.min_value', { min_value: value })
  }
}

export function minPriceRule(value: number, unit?: string) {
  return {
    value,
    message: $t('validations.min_value', { min_value: price(value, unit) })
  }
}

export function maxLengthRule(value: number) {
  return {
    value,
    message: $t('validations.max_length', { max_length: value })
  }
}

export function minLengthRule(value: number) {
  return { value, message: $t('validations.min_length', { min_length: value }) }
}

export function patternRule(value: RegExp) {
  return { value, message: $t('validations.pattern') }
}

export function requiredRule(value = true) {
  return { value, message: $t('validations.required') }
}

export function postalCodeRule(value: string) {
  return !value || isPostalCode(value) || $t('validations.postalCode')
}
