export class PhotoIsRequired extends Error {
  constructor() {
    super('Photo is required')
  }
}