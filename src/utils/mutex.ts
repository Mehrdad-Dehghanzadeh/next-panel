import { MutexStatus, LockStatus } from '@ts/Mutex'

export class Mutex {
  private _status: MutexStatus = MutexStatus.Idle
  public readonly name: string = ''
  public readonly createAt: number = 0
  private _resolve: ((value: unknown) => void) | undefined
  private _reject: ((reason?: unknown) => void) | undefined

  constructor(name: string) {
    this.name = name
    this.createAt = Date.now()
  }

  public wait() {
    if (this._status != MutexStatus.Wait) {
      this._status = MutexStatus.Wait

      return new Promise((res, rej) => {
        this._resolve = res
        this._reject = rej
      })
    }
  }

  public get getStatus(): MutexStatus {
    return this._status
  }

  public resolve<T = any>(value?: T) {
    if (this._resolve) {
      this._resolve(value)
      this._status = MutexStatus.Done
    }
  }

  public reject<R>(reason?: R) {
    if (this._reject) {
      this._reject(reason)
      this._status = MutexStatus.Error
    }
  }
}

export class CustomLock {
  private _status: LockStatus = LockStatus.Release
  public readonly name: string = ''
  public readonly createAt: number = 0
  private _resolve: ((value: unknown) => void) | undefined
  private _reject: ((reason?: unknown) => void) | undefined
  private _p: null | Promise<any> = null

  constructor(name: string) {
    this.name = name
    this.createAt = Date.now()
  }

  public wait() {
    return this._p
  }

  public get getStatus(): LockStatus {
    this._p = new Promise((res, rej) => {
      this._resolve = res
      this._reject = rej
    })

    return this._status
  }

  public setBlock() {
    this._status = LockStatus.Block
  }

  public resolve<T = any>(value?: T) {
    if (this._resolve) {
      this._resolve(value)
      this._p = null
      this._status = LockStatus.Release
    }
  }

  public reject<R>(reason?: R) {
    if (this._reject) {
      this._reject(reason)
      this._p = null
      this._status = LockStatus.Release
    }
  }
}
