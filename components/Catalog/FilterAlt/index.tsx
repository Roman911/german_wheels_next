'use client'
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { useAppSelector } from '@/hooks/redux';
import SwitchTabs from './SwitchTabs';
import SwitchTabsByParams from './SwitchTabsByParams';
import Select from './Select';
import { Section, Subsection } from '@/models/filter';
import type { BaseDataProps, Options } from '@/models/baseData';

const section = Section.Tires;
const subsection: Subsection = Subsection.ByParams;

interface Props {
	filterData: BaseDataProps | undefined
}

const FilterAlt: FC<Props> = ({ filterData }) => {
	const { filter } = useAppSelector(state => state.filterReducer);
	const onChange = () => {
		console.log('onChange');
	}

	const renderSelect = (
		name: string,
		label: string,
		variant: 'white' | 'gray',
		options: Array<Options> = [],
		focusValue?: string | false,
		value?: null | number | string,
		search?: boolean,
		valueStudded?: null | number | string,
		filterOther?: {
			only_c: string | null | undefined
			only_xl: string | null | undefined
			only_owl: string | null | undefined
			only_run_flat: string | null | undefined
			only_off_road: string | null | undefined
		}
	) => (
		<div className='relative'>
			<Select
				name={ name }
				label={ label }
				focusValue={ focusValue }
				options={ options }
				variant={ variant }
				onChange={ onChange }
				filterValue={ value }
				search={ search }
				valueStudded={ valueStudded }
				filterOther={ filterOther }
			/>
		</div>
	);

	return (
		<div className={ twMerge('fixed lg:static top-0 left-0 right-0 bottom-0 bg-gray-800/60 lg:bg-transparent z-20 lg:block') }>
			<div className='filter h-screen lg:h-auto w-[calc(100%-70px)] lg:w-64 mr-6 pt-4 lg:pt-0 bg-white lg:bg-transparent'>
			<SwitchTabs />
			</div>
			<div className='relative h-[calc(100%-50px)] pb-32 lg:pb-4 px-4 pt-4 bg-white border border-gray-200 z-10 overflow-y-auto md:overflow-y-visible'>
				<SwitchTabsByParams />
				{ subsection === Subsection.ByParams && <>
					{ section === Section.Tires && <>
						123
						{renderSelect(
							'width',
							'width',
							'gray',
							filterData?.tyre_width.map(item => ({value: item.value, label: item.value, p: item.p})),
							'175',
							filter?.width,
							true,
						)}
					</> }
					<div>123</div>
				</> }
			</div>
		</div>
	)
};

export default FilterAlt;
