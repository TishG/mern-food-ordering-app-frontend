import { CartItem } from '@/pages/DetailPage';
import { Restaurant } from '@/types';
import { CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useMemo } from 'react';
import { Trash } from 'lucide-react';

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
			(currentTotal + cartItem.price) * cartItem.quantity,
		0
	);
	const totalWithDelivery = totalInCents + restaurant.deliveryPrice;

	return (totalWithDelivery / 100).toFixed(2);
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
	const totalCost = useMemo(
		() => getTotalCost(cartItems, restaurant),
		[restaurant, cartItems]
	);

	return (
		<>
			<CardHeader>
				<CardTitle className='text-2xl font-bold tracking-tight flex justify-between'>
					<span>Your Order</span>
					<span>${totalCost}</span>
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
							${((item.price * item.quantity) / 100).toFixed(2)}
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
					<span>
						$
						{restaurant
							? (restaurant.deliveryPrice / 100).toFixed(2)
							: 'No Delivery Price to show'}
					</span>
				</div>
				<Separator />
			</CardContent>
		</>
	);
};

export default OrderSummary;
