import { FC } from 'react';
import { Section, Subsection } from '@/models/filter';
import TypeCarLinks from '@/components/TypeCarLinks';
import { Language } from '@/models/language';

const section = Section.Tires;
const subsection = Subsection.ByParams;

interface Props {
	locale: Language
}

const FilterByCar: FC<Props> = ({ locale }) => {
	return (
		<div className='flex justify-between lg:justify-end items-center lg:items-start mb-3'>
			{subsection === Subsection.ByParams && section === Section.Tires && <div className='hidden lg:flex gap-x-3 xl:gap-x-6 mr-3 xl:mr-8'>
				<TypeCarLinks section='catalog' locale={ locale } />
			</div>}
			{/*<FilterBtn openFilter={ openFilter } title={ t('filters', true) } />*/}
			{/*<div className="relative inline-block text-left">*/}
			{/*	<button type="button" onClick={() => setOpenSort(prev => !prev)}*/}
			{/*					className="w-56 xl:w-64 h-11 p-3 flex items-center justify-between bg-white text-xs uppercase font-bold border border-gray-200 rounded-sm"*/}
			{/*					id="menu-button" aria-expanded="true" aria-haspopup="true">*/}
			{/*		<div>{t(sort, true)}</div>*/}
			{/*		<div className={classNames('transition-transform', {'rotate-180': openSort})}>*/}
			{/*			<Icons.ChevronDownIcon className='h-3.5 w-3.5' />*/}
			{/*		</div>*/}
			{/*	</button>*/}
			{/*	<div*/}
			{/*		className={classNames('absolute right-0 z-10 w-56 xl:w-64 origin-top-right border border-gray-200 bg-white shadow-lg p-3 xl:p-5 rounded-sm', {hidden: !openSort})}*/}
			{/*		tabIndex={-1}>*/}
			{/*		<div className="py-1 text-sm xl:text-base">*/}
			{/*			{options.map((item, index) => {*/}
			{/*				return <button*/}
			{/*					key={index}*/}
			{/*					className={classNames('flex items-center', {'mt-3': index !== 0})}*/}
			{/*					onClick={() => onClick(item.label, item.param1, item.param2)}*/}
			{/*				>*/}
			{/*					{t(item.title, true)}*/}
			{/*				</button>*/}
			{/*			})}*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</div>*/}
		</div>
	)
};

export default FilterByCar;
