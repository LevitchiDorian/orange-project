
import { ILocationDTO } from './LocationDTO'

export interface IRestaurantDTO {
  id: number;
  restaurantName: string;
  logo: string[];
  locations: ILocationDTO[];
}
  