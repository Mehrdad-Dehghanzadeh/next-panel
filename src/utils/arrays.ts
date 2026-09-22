export function hasItem(arr?: unknown): boolean {
  return Boolean(Array.isArray(arr) && arr?.length)
}

export function removeItem<T>(array: T[], item: T): T[] {
  const index = array.findIndex((el) => el == item)
  if (index > -1) {
    array.splice(index, 1)
  }
  return array
}
