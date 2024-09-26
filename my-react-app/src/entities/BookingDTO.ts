export enum BookingStatus {
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS'
}

export interface IBookingDTO {
  id?: number;              
  name: string;                
  phoneNumber: string;        
  mail?: string;              
  noPeople?: number;            
  preferences?: string;       
  locationId: number;          
  tableId?: number;             
  itemIds: number[];            
  status: BookingStatus;        
}
  