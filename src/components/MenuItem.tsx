import { useMemo } from 'react';
import { MenuItem as MenuItemType } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { getDollars } from '@/utils';

type Props = {
	menuItem: MenuItemType;
	addToCart: () => void;
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
	const dollars = useMemo(() => getDollars(menuItem.price), [menuItem.price]);

	return (
		<Card className='cursor-pointer' onClick={addToCart}>
			<CardHeader>
				<CardTitle>{menuItem.name}</CardTitle>
			</CardHeader>
			<CardContent className='font-bold'>{dollars}</CardContent>
		</Card>
	);
};

export default MenuItem;
