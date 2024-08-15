import { useMemo } from 'react';
import { Order } from '@/types';
import { Progress } from './ui/progress';
import { ORDER_STATUS } from '@/config/order-status-config';

type Props = {
	order: Order;
};

const get12HourFormat = (
	hours: number,
	minutes: number
): { hour: number; period: string; paddedMinutes: string } => {
	let period = hours >= 12 ? 'PM' : 'AM';
	let hour = hours % 12;
	hour = hour ? hour : 12; // The hour '0' should be '12'

	const paddedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

	return { hour, period, paddedMinutes };
};

const getExpectedDelivery = (order: Order): string => {
	const created = new Date(order.createdAt);

	// Validate date
	if (isNaN(created.getTime())) {
		throw new Error('Invalid order creation date.');
	}

	created.setMinutes(
		created.getMinutes() + order.restaurant.estimatedDeliveryTime
	);

	const hours24 = created.getHours();
	const minutes = created.getMinutes();
	const { hour, period, paddedMinutes } = get12HourFormat(hours24, minutes);

	return `${hour}:${paddedMinutes} ${period}`;
};

const getOrderStatusInfo = (order: Order) => {
	return (
		ORDER_STATUS.find((orderStatus) => orderStatus.value === order.status) ||
		ORDER_STATUS[0]
	);
};

const OrderStatusHeader = ({ order }: Props) => {
	const expectedDelivery = useMemo(() => getExpectedDelivery(order), [order]);
	const orderInfo = useMemo(() => getOrderStatusInfo(order), [order]);

	return (
		<>
			<h1 className='text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between'>
				<span>Order Status: {orderInfo?.label}</span>
				{!(orderInfo?.value === 'delivered') && (
					<span>Expected by: {expectedDelivery}</span>
				)}
			</h1>
			<Progress className='animate-puls' value={orderInfo?.progressValue} />
		</>
	);
};

export default OrderStatusHeader;
