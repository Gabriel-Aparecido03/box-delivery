export class InvalidDocumentNumberError extends Error {
  constructor() {
    super('Invalid document number')
  }
}