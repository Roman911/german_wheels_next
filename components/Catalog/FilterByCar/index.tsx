'use client'
import { FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslations } from 'next-intl';
import { useAppSelector } from '@/hooks/redux';
import { Section, Subsection } from '@/models/filter';
import TypeCarLinks from '@/components/TypeCarLinks';
import { Language } from '@/models/language';
import * as Icons from '@/components/Lib/Icons';

const options = [
	{ label: 'cheap at first', param1: 'order[asc]', param2: '1', title: 'cheap at first' },
	{ label: 'expensive at first', param1: 'order[asc]', param2: '0', title: 'expensive at first' },
	{ label: 'by popularity', param1: 'order[value]=popular&order[asc]', param2: '0', title: 'by popularity' },
	{ label: 'by number of offers', param1: 'order[value]', param2: 'offers', title: 'by number of offers' },
];

interface Props {
	locale: Language
	section: Section
	// openFilter: () => void
	// handleClick: (param1: string, param2: string) => void
}

const FilterByCar: FC<Props> = ({ locale, section }) => {
	const t = useTranslations();
	const { subsection } = useAppSelector(state => state.filterReducer);
	const [ openSort, setOpenSort ] = useState(false);
	const [ sort, setSort ] = useState('sorting');

	const onClick = (label: string, param1: string, param2: string) => {
		setSort(label);
		setOpenSort(false);
		console.log(param1,param2)
	}

	return (
		<div className='flex justify-end items-center lg:items-start mb-3'>
			{ subsection === Subsection.ByParams && section === Section.Tires &&
				<div className='hidden lg:flex gap-x-3 xl:gap-x-6 mr-3 xl:mr-8'>
					<TypeCarLinks section='catalog' locale={ locale }/>
				</div> }
			<div className="relative inline-block text-left">
				<button type="button" onClick={() => setOpenSort(prev => !prev)}
								className="w-56 xl:w-64 h-11 p-3 flex items-center justify-between bg-white text-xs uppercase font-bold border border-gray-200 rounded-sm"
								id="menu-button" aria-expanded="true" aria-haspopup="true">
					<div>{t(sort)}</div>
					<div className={twMerge('transition-transform', openSort && 'rotate-180')}>
						<Icons.ChevronDownIcon className='h-4 w-4' />
					</div>
				</button>
				<div
					className={twMerge('absolute right-0 z-10 w-56 xl:w-64 origin-top-right border border-gray-200 bg-white shadow-lg p-3 xl:p-5 rounded-sm', !openSort && 'hidden' )}
					tabIndex={-1}>
					<div className="py-1 text-sm xl:text-base">
						{ options.map((item, index) => {
							return <button
								key={ index }
								className={twMerge('flex items-center', index !== 0 && 'mt-3' )}
								onClick={() => onClick(item.label, item.param1, item.param2)}
							>
								{ t(item.title) }
							</button>
						})}
					</div>
				</div>
			</div>
		</div>
	)
};

export default FilterByCar;
