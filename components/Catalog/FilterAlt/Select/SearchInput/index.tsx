import { FC } from 'react';
import { useTranslations } from 'next-intl';
import * as Icons from '@/components/Lib/Icons';
import { twMerge } from 'tailwind-merge';

interface SearchInputProps {
	value: string
	mixed?: boolean
	handleChange: (value: string) => void
}

const SearchInput: FC<SearchInputProps> = ({ value, mixed, handleChange }) => {
	const t = useTranslations('Catalog');

	return <div className='mb-2 pl-2.5 pr-4 text-gray-900'>
		<label className='relative group' htmlFor="">
			<Icons.SearchIcon className='fill-gray-500 absolute left-2 top-1/2 -translate-y-1/2'/>
			<input
				autoFocus={ true }
				type='text'
				value={ value }
				onChange={ event => handleChange(event.target.value) }
				placeholder={ t('search') }
				className={ twMerge('py-2 pl-10 pr-2 w-full border border-[#A9ACB2] rounded-sm focus:border-blue-300', mixed && 'max-w-28') }
			/>
		</label>
	</div>
};

export default SearchInput;
