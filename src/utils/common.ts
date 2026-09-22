export function runProductionMode(cb: () => any) {
  if (import.meta.env.MODE == 'production') {
    cb()
  }
}

export function isProduction(): boolean {
  return import.meta.env.MODE === 'production'
}

export function runDevelopmentMode(cb: () => any) {
  if (import.meta.env.MODE == 'development') {
    cb()
  }
}

export function isDevelopment(): boolean {
  return import.meta.env.MODE === 'development'
}

export function randomNumber(pow: number = 5): number {
  return Math.floor(Math.random() * (10 ^ pow))
}

export function getBoolean(value: any): boolean {
  let val: boolean = Boolean(value)

  if (typeof value === 'string') {
    const str = value.toLowerCase()

    switch (str) {
      case 'false':
        val = false
        break

      case 'true':
        val = true
        break
    }
  }

  return val
}

export function roundDown(value: number): number {
  return Math.floor(value * 1000) / 1000
}

export function getPercentage(num1: string | number, num2: string | number): number {
  const t = (Number(num1) - Number(num2)) / Number(num2)
  return Math.floor(t * 1000) / 1000
}

/**
 * Download  Base 64
 ***********************************/
export function downloadBase64(name: string, base64: string, type: string = ''): void {
  let a: HTMLAnchorElement = document.createElement('a')
  const header: string = type ? `data:${type};base64,` : ''
  a.href = `${header}${base64}`
  a.download = name
  a.click()
}

export function logout() {
  window.location.href = new URL('/logout', window.location.origin).toString()
}

export function goHome() {
  window.location.href = new URL('/home', window.location.href).toString()
}
