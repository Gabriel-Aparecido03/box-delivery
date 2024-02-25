export interface Package {
  id: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  createdAt: Date;
  updatedAt: Date;
  status: {
    name: string;
    updatedAt: Date;
  };
  recipient: {
    name: string
    id: string
  };
  deliveryman: {
    name: string
    id: string
  }
}