export type StatusType = 'delivered' | 'returned' | 'waiting-for-delivery' | 'pick-up'

interface StatusPropTpyes {
  changedAt: Date,
  status: StatusType
}

export class Status {
  public value: StatusPropTpyes

  private constructor(value: StatusPropTpyes) {
    this.value = value
  }

  static create(value: StatusPropTpyes) {
    return new Status(value)
  }

  static validatedStatus(text: string): boolean {
    const arrayValues = ['delivered', 'returned', 'waiting-for-delivery', 'pick-up']
    return arrayValues.includes(text.toLowerCase())
  }
}