import { FC } from 'react';
import { useTranslations } from 'next-intl';
import MySelect from '../Select';
import type { FilterProps } from '../filterHomePage';

const TiresFilter: FC<FilterProps> = ({ filters, onChange, onSubmit }) => {
	const t = useTranslations('Filters');

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
			<button onClick={ () => onSubmit() } className='btn primary w-full md:w-72 uppercase'>
				{ t('choose tires') }
			</button>
		</div>
	</>
};

export default TiresFilter;
