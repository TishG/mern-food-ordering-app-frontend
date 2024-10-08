import {
	useCreateMyRestaurant,
	useGetMyRestaurant,
	useGetMyRestaurantOrders,
	useUpdateMyRestaurant,
} from '@/api/MyRestaurantApi';
import OrderItemCard from '@/components/OrderItemCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm';

const ManageRestaurantPage = () => {
	const { createRestaurant, isLoading: isCreateLoading } =
		useCreateMyRestaurant();
	const { restaurant, isLoading: isGetLoading } = useGetMyRestaurant();
	const { updateRestaurant, isLoading: isUpdateLoading } =
		useUpdateMyRestaurant();
	const { orders } = useGetMyRestaurantOrders();

	const isEditing = !isGetLoading && !!restaurant;

	return (
		<Tabs defaultValue='orders'>
			<TabsList>
				<TabsTrigger value='orders'>Orders</TabsTrigger>
				<TabsTrigger value='manage-restaurant'>Manage Restaurant</TabsTrigger>
			</TabsList>
			<TabsContent
				value='orders'
				className='space-y-5 bg-gray-50 p-10 rounded-lg'
			>
				<h2 className='text-2xl font-bold'>
					{orders?.length || 0} active orders
				</h2>
				{orders?.map((order, index) => (
					<OrderItemCard order={order} key={index} />
				))}
			</TabsContent>
			<TabsContent value='manage-restaurant'>
				<ManageRestaurantForm
					restaurant={restaurant}
					onSubmit={isEditing ? updateRestaurant : createRestaurant}
					isLoading={isCreateLoading || isGetLoading || isUpdateLoading}
				/>
			</TabsContent>
		</Tabs>
	);
};

export default ManageRestaurantPage;
