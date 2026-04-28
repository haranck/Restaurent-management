import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRestaurant, updateRestaurant, deleteRestaurant, fetchAllRestaurant } from "../../services/RestaurantService/restaurantSerive";

export const useCreateRestaurant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createRestaurant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['restaurants'] });
        }
    });
}

export const useUpdateRestaurant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateRestaurant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['restaurants'] });
        }
    });
}

export const useDeleteRestaurant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteRestaurant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['restaurants'] });
        }
    });
}

export const useFetchAllRestaurant = () => {
    return useQuery({
        queryKey: ['restaurants'],
        queryFn: fetchAllRestaurant,
    });
}