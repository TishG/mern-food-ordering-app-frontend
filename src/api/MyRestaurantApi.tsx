import { Order, Restaurant } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
	const { getAccessTokenSilently } = useAuth0();

	const getMyRestaurantRequest = async (): Promise<Restaurant> => {
		const accessToken = await getAccessTokenSilently();

		const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!response.ok) {
			throw new Error('Failed to get restaurant.');
		}

		return response.json();
	};

	// useQuery for GET methods
	const { data: restaurant, isLoading } = useQuery(
		'fetchMyRestaurant',
		getMyRestaurantRequest
	);

	return { restaurant, isLoading };
};

export const useCreateMyRestaurant = () => {
	const { getAccessTokenSilently } = useAuth0();

	const ceateMyRestaurantRequest = async (
		restaurantFormData: FormData
	): Promise<Restaurant> => {
		const accessToken = await getAccessTokenSilently();

		const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			body: restaurantFormData,
		});

		if (!response.ok) {
			throw new Error('Failed to create restaurant.');
		}

		return response.json();
	};
	// useMutation for PUT/POST methods
	const {
		mutate: createRestaurant,
		isLoading,
		isSuccess,
		error,
	} = useMutation(ceateMyRestaurantRequest);

	if (isSuccess) {
		toast.success('Restaurant created!');
	}

	if (error) {
		toast.error('Unable to create restaurant.');
	}

	return { createRestaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
	const { getAccessTokenSilently } = useAuth0();

	const updateMyRestaurantRequest = async (
		restaurantFormData: FormData
	): Promise<Restaurant> => {
		const accessToken = await getAccessTokenSilently();

		const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			body: restaurantFormData,
		});

		if (!response.ok) {
			throw new Error('Failed to update restaurant.');
		}

		return response.json();
	};

	const {
		mutate: updateRestaurant,
		isLoading,
		isSuccess,
		error,
	} = useMutation(updateMyRestaurantRequest);

	if (isSuccess) {
		toast.success('Restaurant updated!');
	}

	if (error) {
		toast.error('Unable to update restaurant.');
	}

	return { updateRestaurant, isLoading };
};

export const useGetMyRestaurantOrders = () => {
	const { getAccessTokenSilently } = useAuth0();

	const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
		const accessToken = await getAccessTokenSilently();

		const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error('Failed to fetch orders');
		}

		return response.json();
	};

	const { data: orders, isLoading } = useQuery(
		'fetchMyRestaurantOrders',
		getMyRestaurantOrdersRequest
	);

	return { orders, isLoading };
};

type UpdateOrderStatusRequest = {
	orderId: string;
	status: string;
};

export const useUpdateMyRestaurantOrderStatus = () => {
	const { getAccessTokenSilently } = useAuth0();

	const updateMyRestaurantOrderStatus = async (
		updateOrderStatusRequest: UpdateOrderStatusRequest
	) => {
		const accessToken = await getAccessTokenSilently();

		const response = await fetch(
			`${API_BASE_URL}/api/my/restaurant/order/${updateOrderStatusRequest.orderId}/status`,
			{
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ status: updateOrderStatusRequest.status }),
			}
		);

		if (!response.ok) {
			throw new Error('Failed to update status');
		}

		return response.json();
	};

	const {
		mutateAsync: updateRestaurantOrderStatus,
		isLoading,
		isError,
		isSuccess,
		reset,
	} = useMutation(updateMyRestaurantOrderStatus);

	if (isSuccess) {
		toast.success('Order updated');
	}

	if (isError) {
		toast.error('Unable to update order');
		reset();
	}

	return { updateRestaurantOrderStatus, isLoading };
};
