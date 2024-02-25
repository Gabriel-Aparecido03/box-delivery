export class DocumentNumber {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string) {
    return new DocumentNumber(value)
  }

  static validatedDocumentNumber(documentNumber: string) : boolean {
    const regex = /^(\d{3}\.\d{3}\.\d{3}-\d{2})|(\d{11})$/;
    return regex.test(documentNumber)
  }
}