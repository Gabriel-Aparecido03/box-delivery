export interface Recipient {
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