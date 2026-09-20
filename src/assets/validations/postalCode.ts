export function isPostalCode(val: string) {
  return /^\d{10}$/.test(val)
}
