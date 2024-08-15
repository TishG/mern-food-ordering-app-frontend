import { useMemo } from 'react';

import { Order } from '@/types';
import { getDollars } from '@/utils';

import { Separator } from './ui/separator';

type Props = {
	order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
	const dollars = useMemo(
		() => getDollars(order.totalAmount),
		[order.totalAmount]
	);
	return (
		<div className='space-y-5'>
			<div className='flex flex-col'>
				<span className='font-bold'>Delivering to:</span>
				<span>{order.deliveryDetails.name}</span>
				<span>
					{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
				</span>
			</div>
			<div className='flex flex-col'>
				<span className='font-bold'>Your Order</span>
				<ul>
					{order.cartItems.map((item, index) => (
						<li key={index}>
							{item.name} x {item.quantity}
						</li>
					))}
				</ul>
			</div>
			<Separator />
			<div className='flex flex-col'>
				<span className='font-bold'>Total</span>
				<span>{dollars || 'No total to show'}</span>
			</div>
		</div>
	);
};

export default OrderStatusDetail;
