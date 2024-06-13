import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import DetailsSection from './DetailsSection';
import { Separator } from '@/components/ui/separator';
import CuisinesSection from './CuisinesSection';
import MenuSection from './MenuSection';
import ImageSection from './ImageSection';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Restaurant } from '@/types';

const formSchema = z
	.object({
		restaurantName: z.string({
			required_error: 'Restaurant Name is required.',
		}),
		city: z.string({ required_error: 'City is required.' }),
		country: z.string({ required_error: 'Country is required.' }),
		deliveryPrice: z.coerce.number({
			invalid_type_error: 'must be a number',
			required_error: 'Delivery Price is requred.',
		}),
		estimatedDeliveryTime: z.coerce.number({
			invalid_type_error: 'must be a number',
			required_error: 'Estimated Delivery Time is requred.',
		}),
		cuisines: z
			.array(z.string())
			.nonempty({ message: 'Please select at least one item.' }),
		menuItems: z.array(
			z.object({
				name: z.string().min(1, { message: 'Name is required' }),
				price: z.coerce
					.number({ invalid_type_error: 'must be a number' })
					.min(1, { message: 'Price is required.' }),
			})
		),
		imageUrl: z.string().optional(),
		imageFile: z.instanceof(File, { message: 'Image is required.' }).optional(),
	})
	.refine((data) => data.imageUrl || data.imageFile, {
		message: 'Either Image URL or Image File must be provided.',
		path: ['imageFile'],
	});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
	restaurant?: Restaurant;
	onSubmit: (restaurantFormData: FormData) => void;
	isLoading: boolean;
};

const ManageRestaurantForm = ({ onSubmit, isLoading, restaurant }: Props) => {
	const form = useForm<RestaurantFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cuisines: [],
			menuItems: [{ name: '', price: 0 }],
		},
	});

	useEffect(() => {
		if (!isLoading && restaurant) {
			const deliveryPriceDollars = restaurant.deliveryPrice / 100;
			const deliveryPriceTwoDecimals = deliveryPriceDollars.toFixed(2);
			const deliveryPriceFormatted = parseFloat(deliveryPriceTwoDecimals);

			const menuItemsFormatted = restaurant.menuItems.map((menuItem) => {
				const menuItemDollars = menuItem.price / 100;
				const menuItemTwoDecimals = menuItemDollars.toFixed(2);
				const menuItemPriceFormatted = parseFloat(menuItemTwoDecimals);

				return {
					...menuItem,
					price: menuItemPriceFormatted,
				};
			});

			const updatedRestaurant = {
				...restaurant,
				deliveryPrice: deliveryPriceFormatted,
				menuItems: menuItemsFormatted,
			};

			form.reset(updatedRestaurant);
		}
		return;
	}, [form, restaurant, isLoading]);

	const onHandleSubmit = (formDataJson: RestaurantFormData) => {
		const formData = new FormData();

		formData.append('restaurantName', formDataJson.restaurantName);
		formData.append('city', formDataJson.city);
		formData.append('country', formDataJson.country);

		// formDataJson.deliveryPrice * 100 because stripe requires lowest unit, which is cents
		formData.append(
			'deliveryPrice',
			(formDataJson.deliveryPrice * 100).toString()
		);
		formData.append(
			'estimatedDeliveryTime',
			formDataJson.estimatedDeliveryTime.toString()
		);

		formDataJson.cuisines.forEach((cuisine, index) => {
			formData.append(`cuisines[${index}]`, cuisine);
		});
		formDataJson.menuItems.forEach((menuItem, index) => {
			formData.append(`menuItems[${index}][name]`, menuItem.name);
			formData.append(
				`menuItems[${index}][price]`,
				// menuItem.price * 100 because stripe requires lowest unit, which is cents
				(menuItem.price * 100).toString()
			);
		});

		if (formDataJson.imageFile) {
			formData.append('imageFile', formDataJson.imageFile);
		}

		onSubmit(formData);
	};

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onHandleSubmit)}
				className='space-y-8 p-10 bg-gray-50 rounded-lg'
			>
				<DetailsSection />
				<Separator />
				<CuisinesSection />
				<Separator />
				<MenuSection />
				<Separator />
				<ImageSection />
				{isLoading ? <LoadingButton /> : <Button type='submit'>Submit</Button>}
			</form>
		</FormProvider>
	);
};

export default ManageRestaurantForm;
