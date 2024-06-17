import { useMemo } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Button } from './ui/button';
import { DropdownMenuItem } from './ui/dropdown-menu';

type Props = {
	onChange: (value: string) => void;
	sortOption: string;
};

const SORT_OPTIONS = [
	{
		label: 'Best Match',
		value: 'bestMatch',
	},
	{
		label: 'Delivery Price',
		value: 'deliveryPrice',
	},
	{
		label: 'Estimated Delivery Time',
		value: 'estimatedDeliveryTime',
	},
];

const getLabelFromSortOptions = (sortOption: string): string => {
	return (
		SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
		'Best Match'
	);
};

const SortOptionDropdown = ({ onChange, sortOption }: Props) => {
	const selectedSortLabel = useMemo(
		() => getLabelFromSortOptions(sortOption),
		[sortOption]
	);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='cursor-pointer'>
				<Button variant='outline' className='w-full'>
					Sort by: {selectedSortLabel}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{SORT_OPTIONS.map((option) => (
					<DropdownMenuItem
						className='cursor-pointer'
						onClick={() => onChange(option.value)}
					>
						{option.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default SortOptionDropdown;
