import { useMemo } from 'react';
import { Trash } from 'lucide-react';

import { CartItem } from '@/pages/DetailPage';
import { Restaurant } from '@/types';
import { getDollars } from '@/utils';

import { CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

type Props = {
	restaurant?: Restaurant;
	cartItems: CartItem[];
	removeFromCart: (cartItem: CartItem) => void;
};

const getTotalCost = (
	cartItems: CartItem[],
	restaurant?: Restaurant
): string => {
	if (!cartItems || !restaurant) {
		return '';
	}

	const totalInCents = cartItems.reduce(
		(currentTotal, cartItem) =>
			currentTotal + cartItem.price * cartItem.quantity,
		0
	);
	const totalWithDelivery = totalInCents + restaurant.deliveryPrice;

	return getDollars(totalWithDelivery) || 'No Total to show';
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
	const totalCost = useMemo(
		() => getTotalCost(cartItems, restaurant),
		[restaurant, cartItems]
	);
	const deliveryCost = useMemo(() => {
		return restaurant
			? getDollars(restaurant?.deliveryPrice)
			: 'No Delivery Price to show';
	}, [restaurant?.deliveryPrice]);

	return (
		<>
			<CardHeader>
				<CardTitle className='text-2xl font-bold tracking-tight flex justify-between'>
					<span>Your Order</span>
					<span>{totalCost}</span>
				</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col gap-5'>
				{cartItems.map((item, index) => (
					<div key={`${item.name}-${index}`} className='flex justify-between'>
						<span>
							<Badge variant='outline' className='mr-2'>
								{item.quantity}
							</Badge>
							{item.name}
						</span>
						<span className='flex items-center gap-1'>
							{getDollars(item.price * item.quantity)}
							<Trash
								className='cursor-pointer'
								color='red'
								size={20}
								onClick={() => removeFromCart(item)}
							/>
						</span>
					</div>
				))}
				<Separator />
				<div className='flex justify-between'>
					<span>Delivery</span>
					<span>{deliveryCost}</span>
				</div>
				<Separator />
			</CardContent>
		</>
	);
};

export default OrderSummary;
