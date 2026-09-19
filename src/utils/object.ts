/**
 *  Deep Freeze Object
 ***********************/
export function deepFreeze<T>(obj: T): Readonly<T> {
  if (
    obj === null ||
    (typeof obj !== 'object' && typeof obj !== 'function') ||
    Object.isFrozen(obj)
  ) {
    return obj
  }

  Object.freeze(obj)

  Object.getOwnPropertyNames(obj).forEach(function (prop: string) {
    const objectProp = obj[prop as keyof typeof obj]
    if (
      objectProp !== null &&
      (typeof objectProp === 'object' || typeof objectProp === 'function') &&
      !Object.isFrozen(objectProp)
    ) {
      deepFreeze(objectProp)
    }
  })

  return obj
}

/**
 *  Check Object Is Empty
 ***************************/
export function isEmpty(obj: unknown): boolean {
  return obj !== null && typeof obj === 'object' && Object.keys(obj).length === 0
}

/**
 *  Convert Object To Array
 ***************************/
export function objectToArray<T extends object>(obj: T) {
  return !isEmpty(obj)
    ? Object.entries(obj).map(([key, value]) => {
        return { [key]: value }
      })
    : []
}

/**
 * Deep Clone Object
 ************************/
export function deepClone<T>(obj: T): T {
  return structuredClone(obj)
}

/**
 * remove keyof object
 *****************************/
export function omit<T extends object>(obj: T, keys: readonly (keyof T)[]): void {
  keys.forEach((key) => Reflect.deleteProperty(obj, key))
}

/**
 * remove keyof object and clone
 *****************************************/
export function cloneOmit<T extends object>(
  obj: T,
  keys: readonly (keyof T)[]
): Partial<T> {
  const value = deepClone(obj)
  omit(value, keys)
  return value
}

/**
 * get value object and subObject in this object
 *******************************************************/
export function getValueObject(obj: unknown, path: string): unknown {
  if (obj === undefined || obj === null || path.trim() === '') {
    return undefined
  }

  return path.split('.').reduce<unknown>((value, key) => {
    if (value === null || typeof value !== 'object') {
      return undefined
    }

    return (value as Record<string, unknown>)[key]
  }, obj)
}
