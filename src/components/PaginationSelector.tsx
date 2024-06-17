import { useMemo } from 'react';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from './ui/pagination';

type Props = {
	page: number;
	pages: number;
	onPageChange: (page: number) => void;
};

const getPageNumbers = (pages: number): number[] =>
	Array.from({ length: pages }, (_, i) => i + 1);

const PaginationSelector = ({ page, pages, onPageChange }: Props) => {
	if (pages <= 0) return null;

	const pageNumbers = useMemo(() => getPageNumbers(pages), [pages]);

	return (
		<Pagination>
			<PaginationContent>
				{page !== 1 && (
					<PaginationItem>
						<PaginationPrevious
							href='#'
							onClick={() => onPageChange(page - 1)}
						/>
					</PaginationItem>
				)}
				{pageNumbers.map((number) => (
					<PaginationItem key={number}>
						<PaginationLink
							href='#'
							onClick={() => onPageChange(number)}
							isActive={page === number}
						>
							{number}
						</PaginationLink>
					</PaginationItem>
				))}

				{page !== pages && (
					<PaginationItem>
						<PaginationNext href='#' onClick={() => onPageChange(page + 1)} />
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
};

export default PaginationSelector;
