export interface CoordinateType {
  latitude: number
  longitude: number
}

export class Coordinate {

  latitude: number
  longitude: number

  private constructor({ latitude, longitude }: CoordinateType) {
    this.latitude = latitude
    this.longitude = longitude
  }

  public validateCoordinates() {
    if (
      !Number.isFinite(this.longitude) ||
      this.longitude < -180 ||
      this.longitude > 180
    ) {
      return false
    }

    if (
      !Number.isFinite(this.latitude) ||
      this.latitude < -90 ||
      this.latitude > 90
    ) {
      return false
    }

    return true;
  }


  getDistanceBetweenCoordinates(
    from: CoordinateType
  ) {
    if (from.latitude ===this.latitude && from.longitude ===this.longitude) {
      return 0
    }

    const fromRadian = (Math.PI * from.latitude) / 180
    const toRadian = (Math.PI *this.latitude) / 180

    const theta = from.longitude -this.longitude
    const radTheta = (Math.PI * theta) / 180

    let dist =
      Math.sin(fromRadian) * Math.sin(toRadian) +
      Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)

    if (dist > 1) {
      dist = 1
    }

    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344

    return dist
  }

  static create({ latitude, longitude }: CoordinateType) {
    const coordinate = new Coordinate({ latitude, longitude })
    return coordinate
  }
}