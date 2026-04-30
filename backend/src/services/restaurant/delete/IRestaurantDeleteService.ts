export interface IRestaurantDeleteService {
    delete(id: string): Promise<void>;
}
