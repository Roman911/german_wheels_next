'use client'
import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import MySelect from '../Select';
import { Button } from '@/components/UI';
import type { FilterProps } from '../filterHomePage';

const DisksFilter: FC<FilterProps> = ({ filters, onChange, onSubmit }) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const t = useTranslations('Filters');

	const submit = () => {
		setIsLoading(true);
		onSubmit();
	}

	return <>
		<div className='grid grid-cols-1 md:grid-cols-4 gap-2.5 md:mt-7'>
			{ filters.map(item => {
				return <MySelect
					key={ item.name }
					name={ item.name }
					label={ t(item.label) }
					options={ item.options }
					onChange={ onChange }
					focusValue={ item.focusValue }
				/>
			}) }
		</div>
		<div className='mt-4 md:mt-10 flex justify-center'>
			<Button isLoading={ isLoading } onPress={ submit } className='uppercase w-full md:w-72 hover:!opacity-100'>
				{ t('choose disks') }
			</Button>
		</div>
	</>
};

export default DisksFilter;
