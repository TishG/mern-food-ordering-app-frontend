import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSearchRestaurants } from '@/api/RestaurantApi';
import SearchResultInfo from '@/components/SearchResultInfo';
import SearchResultsCard from '@/components/SearchResultCard';
import SearchBar, { SearchForm } from '@/components/SearchBar';
import PaginationSelector from '@/components/PaginationSelector';
import CuisineFilter from '@/components/CuisineFilter';
import SortOptionDropdown from '@/components/SortOptionDropdown';

export type SearchState = {
	searchQuery: string;
	page: number;
	selectedCuisines: string[];
	sortOption: string;
};

const SearchPage = () => {
	const { city } = useParams();
	const [searchState, setSearchState] = useState<SearchState>({
		searchQuery: '',
		page: 1,
		selectedCuisines: [],
		sortOption: 'bestMatch',
	});
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	const { results, isLoading } = useSearchRestaurants(searchState, city);

	const setSortOption = (sortOption: string) => {
		setSearchState((prevState) => ({
			...prevState,
			sortOption,
			page: 1,
		}));
	};

	const setSelectedCuisines = (selectedCuisines: string[]) => {
		setSearchState((prevState) => ({
			...prevState,
			selectedCuisines,
			page: 1,
		}));
	};

	const setPage = (page: number) => {
		setSearchState((prevState) => ({
			...prevState,
			page,
		}));
	};

	const setSearchQuery = (searchFormData: SearchForm) => {
		setSearchState((prevState) => ({
			...prevState,
			searchQuery: searchFormData.searchQuery,
			page: 1,
		}));
	};

	const resetSearch = () => {
		setSearchState((prevState) => ({
			...prevState,
			searchQuery: '',
			page: 1,
		}));
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!results?.data || !city) {
		return <div>No results found.</div>;
	}

	return (
		<div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
			<div id='cuisines-list'>
				<CuisineFilter
					selectedCuisines={searchState.selectedCuisines}
					onChange={setSelectedCuisines}
					isExpanded={isExpanded}
					onExpandedClick={() =>
						setIsExpanded((prevIsExpanded) => !prevIsExpanded)
					}
				/>
			</div>
			<div id='main-content' className='flex flex-col gap-5'>
				<SearchBar
					searchQuery={searchState.searchQuery}
					onSubmit={setSearchQuery}
					placeholder='Search by Cuisine or Restaurant Name.'
					onReset={resetSearch}
				/>
				<div className='flex justify-between flex-col gap-3 lg:flex-row'>
					<SearchResultInfo total={results.pagination.total} city={city} />
					<SortOptionDropdown
						sortOption={searchState.sortOption}
						onChange={setSortOption}
					/>
				</div>
				{results.data.map((restaurant, index) => (
					<div key={index}>
						<SearchResultsCard restaurant={restaurant} />
					</div>
				))}
				<PaginationSelector
					page={results.pagination.page}
					pages={results.pagination.pages}
					onPageChange={setPage}
				/>
			</div>
		</div>
	);
};

export default SearchPage;
