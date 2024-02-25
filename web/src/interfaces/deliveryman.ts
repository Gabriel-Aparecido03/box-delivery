export type Deliveryman = {
  id: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  createdAt: Date;
  updatedAt: Date;
  documentNumber: string;
  name: string;
}