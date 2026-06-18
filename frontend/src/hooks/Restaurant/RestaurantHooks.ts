import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useEffect } from "react";
import { setAllRestaurants, setMyRestaurants, addRestaurant } from "../../store/slice/restaurantSlice";
import { createRestaurant, updateRestaurant, deleteRestaurant, fetchAllRestaurant, fetchMyRestaurants } from "../../services/RestaurantService/restaurantSerive";
 
export const useCreateRestaurant = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: createRestaurant,
        onSuccess: (response) => {
            const newRestaurant = response.data?.restaurant;
            if (newRestaurant) {
                dispatch(addRestaurant(newRestaurant));
            }
            queryClient.invalidateQueries({ queryKey: ['restaurants'] });
            queryClient.invalidateQueries({ queryKey: ['my-restaurants'] });
        }
    });
}

export const useUpdateRestaurant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateRestaurant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['restaurants'] });
            queryClient.invalidateQueries({ queryKey: ['my-restaurants'] });
        }
    });
}

export const useDeleteRestaurant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteRestaurant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['restaurants'] });
            queryClient.invalidateQueries({ queryKey: ['my-restaurants'] });
        }
    });
}

export const useFetchAllRestaurant = () => {
    const dispatch = useDispatch();
    const query = useQuery({
        queryKey: ['restaurants'],
        queryFn: fetchAllRestaurant,
    });

    useEffect(() => {
        const payload = query.data?.data?.restaurants;
        if (payload) {
            dispatch(setAllRestaurants(payload));
        }
    }, [query.data, dispatch]);

    return query;
}

export const useFetchMyRestaurants = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const query = useQuery({
        queryKey: ['my-restaurants'],
        queryFn: fetchMyRestaurants,
        enabled: !!user,
    });

    useEffect(() => {
        const payload = query.data?.data?.restaurants;
        if (payload) {
            dispatch(setMyRestaurants(payload));
        }
    }, [query.data, dispatch]);

    return query;
}