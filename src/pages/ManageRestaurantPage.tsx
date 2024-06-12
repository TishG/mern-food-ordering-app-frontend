import {
	useCreateMyRestaurant,
	useGetMyRestaurant,
	useUpdateMyRestaurant,
} from '@/api/MyRestaurantApi';
import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm';

const ManageRestaurantPage = () => {
	const { createRestaurant, isLoading: isCreateLoading } =
		useCreateMyRestaurant();
	const { restaurant, isLoading: isGetLoading } = useGetMyRestaurant();
	const { updateRestaurant, isLoading: isUpdateLoading } =
		useUpdateMyRestaurant();

	const isEditing = !isGetLoading && !!restaurant;

	return (
		<ManageRestaurantForm
			restaurant={restaurant}
			onSubmit={isEditing ? updateRestaurant : createRestaurant}
			isLoading={isCreateLoading || isGetLoading || isUpdateLoading}
		/>
	);
};

export default ManageRestaurantPage;
