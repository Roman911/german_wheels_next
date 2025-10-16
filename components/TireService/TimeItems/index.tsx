import React, { FC } from 'react';
import { baseDataAPI } from '@/services/baseDataService';
import NoResult from '@/components/Lib/NoResult';
import Spinner from '@/components/Lib/Spinner';
import { setTime } from '@/store/slices/tireService';
import { twMerge } from 'tailwind-merge';
import { Button } from '@heroui/react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

interface Props {
	location: number
	date: string
}

const TimeItems: FC<Props> = ({ location, date }) => {
	const dispatch = useAppDispatch();
	const { time } = useAppSelector((state) => state.tireServiceReducer);
	const { data, isLoading } = baseDataAPI.useFetchSlotsQueryQuery(`?location_id=${ location }&date=${ date }`);

	// Reusable styles
	const baseButton =
		'text-gray-500 hover:text-teal-600 hover:border-teal-600 hover:shadow-lg shadow-teal-600/20';
	const activeButton = 'text-teal-600 border-teal-600 shadow-lg shadow-teal-600/20';

	return (
		<Spinner height='h-40' show={ isLoading }>
			<div className='flex flex-wrap gap-2'>
				{ data ? data.filter(item => item).map((item, index) => {
						return <Button
							key={ index }
							variant='bordered'
							color='default'
							radius='lg'
							size='lg'
							onPress={ () => dispatch(setTime(item.time)) }
							className={ twMerge(baseButton, time === item.time && activeButton) }
						>
							{ item.time }
						</Button>
					}) :
					<NoResult noResultText='no free time found'/> }
			</div>
		</Spinner>
	)
};

export default TimeItems;
