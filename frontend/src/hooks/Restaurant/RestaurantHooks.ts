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
        onSuccess: (data) => {
            if (data?.restaurant) {
                dispatch(addRestaurant(data.restaurant));
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
        if (query.data?.restaurants) {
            dispatch(setAllRestaurants(query.data.restaurants));
        } else if (Array.isArray(query.data)) {
            dispatch(setAllRestaurants(query.data));
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
        if (query.data?.restaurants) {
            dispatch(setMyRestaurants(query.data.restaurants));
        } else if (Array.isArray(query.data)) {
            dispatch(setMyRestaurants(query.data));
        }
    }, [query.data, dispatch]);

    return query;
}