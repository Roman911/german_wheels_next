'use client'
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { baseDataAPI } from '@/services/baseDataService';
import { useAppDispatch } from '@/hooks/redux';
import { setSearch } from '@/store/slices/searchSlice';
import Spinner from '@/components/Lib/Spinner';
import CloseButton from '@/components/Lib/CloseButton';
import * as Icons from '@/components/Lib/Icons';
import styles from '../index.module.scss';
import { Language } from '@/models/language';

const Search = ({ locale }: { locale: Language }) => {
	const t = useTranslations('Catalog');
	const [ value, setValue ] = useState('');
	const { data } = baseDataAPI.useFetchProductsQuery({ id: `?name=${ value }` })
	const dispatch = useAppDispatch();

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const handleClick = () => {
		setValue('');
	}

	const handleClickAllProduct = () => {
		dispatch(setSearch(value));
		handleClick();
	}

	return (
		<div className={ twMerge('relative w-full mx-auto mt-4 md:pr-6 lg:mt-0 lg:max-w-[500px]', styles.search) }>
			<div
				className='flex rounded-sm bg-natural-800 p-0.5 border border-natural-600 w-full'>
				<input
					type="text"
					value={ value }
					onChange={ (e) => onChange(e) }
					className="w-full flex bg-transparent pl-4 text-[15px] text-white font-medium outline-0"
					placeholder={ t('search') }
				/>
				<button type="submit" className="btn primary w-14 h-9">
					<Icons.SearchIcon className='fill-black'/>
				</button>
			</div>
			<div className={ twMerge(
				'absolute top-12 right-0 z-20 py-6 px-8 md:px-10 bg-gray-800 text-white rounded-sm w-full lg:max-w-[460px]',
				value.length < 2 && 'hidden'
			) }>
				<CloseButton handleClick={ handleClick }/>
				<ul className='mb-8'>
					<Spinner height='h-20' show={!data}>
						{ data?.result ? data.data.products?.map(item => {
							return <li key={ item.group } className='my-3'>
								<Link className='hover:underline' onClick={ handleClick } href={ `/${locale}/${item.page_url}` }>
									{ item.full_name }
								</Link>
							</li>
						}) : <p>{ t('no result by search') }</p> }
					</Spinner>
				</ul>
				{ data?.result && <Link className='btn primary mx-auto' onClick={ handleClickAllProduct } href={ `/${locale}/search` }>
					{ locale === Language.UA ? 'Усі результати пошуку ' : 'Все результаты поиска ' }
					({ data?.data.total_count })
				</Link> }
			</div>
		</div>
	)
};

export default Search;
