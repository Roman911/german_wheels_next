'use client'
import { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { baseDataAPI } from '@/services/baseDataService';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setCarFilter, setSend } from '@/store/slices/filterCarSlice';
import { changeSubsection } from '@/store/slices/filterSlice';
import MySelect from '@/components/Home/HomeFilter/Select';
import { Language } from '@/models/language';
import { Subsection } from '@/models/section';
import { Button } from '@/components/UI';
import { Section } from '@/models/filter';

const FilterByCar = ({ locale }: { locale: Language }) => {
	const router = useRouter();
	const [ isLoadingTires, setIsLoadingTires ] = useState(false);
	const [ isLoadingDisks, setIsLoadingDisks ] = useState(false);
	const t = useTranslations('Filters');
	const { filter } = useAppSelector((state) => state.filterCarReducer);
	const dispatch = useAppDispatch();
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { data: model, refetch: modelRefetch } = baseDataAPI.useFetchAutoModelQuery(`${ filter.brand }`);
	const { data: modelYear } = baseDataAPI.useFetchAutoYearQuery(`${ filter.model }`);
	const {
		data: modelKit,
		refetch: modelKitRefetch
	} = baseDataAPI.useFetchAutoModelKitQuery(`${ filter.model }/${ filter.year }`);

	const filters = [
		{
			label: t('car brand'),
			name: 'brand',
			options: data?.auto?.map(item => ({ value: item.value, label: item.label }))
		},
		{
			label: t('model'),
			name: 'model',
			options: model?.map(item => ({ value: item.value, label: item.label })),
			isDisabled: model?.length === 0,
		},
		{
			label: t('graduation year'),
			name: 'year',
			options: modelYear?.map(item => ({ value: item, label: `${ item }` })),
			isDisabled: modelYear?.length === 0,
		},
		{
			label: t('modification'),
			name: 'modification',
			options: modelKit?.map(item => ({ value: item.value, label: item.label })),
			isDisabled: modelKit?.length === 0,
		}
	];

	const onChange = (name: string, value: number | string | null) => {
		dispatch(setCarFilter({ ...filter, [name]: value }));
		if(name === 'model') {
			modelRefetch();
		} else if(name === 'modification' || name === 'year') {
			modelKitRefetch();
		}
	}

	const onClick = (type: Section, setIsLoading: Dispatch<SetStateAction<boolean>>) => {
		setIsLoading(true)
		dispatch(changeSubsection(Subsection.ByCars));
		dispatch(setSend());
		router.push(`/${ locale }/catalog/${ type }`);
	}

	return (
		<>
			<div className='grid grid-cols-1 md:grid-cols-4 gap-2.5 md:mt-7'>
				{ filters.map(item => {
					return <MySelect
						key={ item.name }
						name={ item.name }
						label={ item.label }
						options={ item.options }
						onChange={ onChange }
						isDisabled={ item.isDisabled }
					/>
				}) }
			</div>
			<div className='mt-4 md:mt-10 flex gap-4 flex-col md:flex-row justify-center'>
				<Button
					isDisabled={ filter.modification === 0 }
					isLoading={ isLoadingTires }
					onPress={ () => onClick(Section.Tires, setIsLoadingTires) }
					className='w-full md:w-56 uppercase'
				>
					{ t('choose tires') }
				</Button>
				<Button
					isDisabled={ filter.modification === 0 }
					isLoading={ isLoadingDisks }
					onPress={ () => onClick(Section.Disks, setIsLoadingDisks) }
					className='w-full md:w-56 uppercase'
				>
					{ t('choose disks') }
				</Button>
			</div>
		</>
	)
};

export default FilterByCar;
