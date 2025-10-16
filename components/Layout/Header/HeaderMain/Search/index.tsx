'use client'
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Link, useRouter } from '@/i18n/routing';
import { Button, Input } from '@heroui/react';
import { baseDataAPI } from '@/services/baseDataService';
import { useAppDispatch } from '@/hooks/redux';
import { setSearch } from '@/store/slices/searchSlice';
import Spinner from '@/components/Lib/Spinner';
import CloseButton from '@/components/Lib/CloseButton';
import * as Icons from '@/components/Lib/Icons';
import styles from '../index.module.scss';
import { useClickOutside } from '@/hooks/clickOutside';

const Search = () => {
	const router = useRouter();
	const t = useTranslations('Catalog');
	const [ value, setValue ] = useState('');
	const { data } = baseDataAPI.useFetchProductsQuery({ id: `?name=${ value }` })
	const dispatch = useAppDispatch();
	const dropdownRef = useRef<HTMLDivElement>(null);
	const handleClick = () => {
		setValue('');
	}
	useClickOutside({ ref: dropdownRef, open: value.length < 2, onClose: handleClick });

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const handleClickAllProduct = () => {
		dispatch(setSearch(value));
		handleClick();
	}

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleClickAllProduct();
		router.push(`/search`);
	}

	return (
		<div className={ twMerge('relative w-full mx-auto mt-4 md:pr-6 lg:mt-0 lg:max-w-[500px]', styles.search) }>
			<form className='w-full' onSubmit={ onSubmit }>
				<Input
					onChange={ onChange }
					classNames={ {
						base: 'max-w-full sm:max-w-full h-11',
						mainWrapper: 'h-full',
						input: 'text-[15px] text-white',
						inputWrapper: 'h-full font-normal text-default-500 w-full pr-0 rounded-xs border-gray-600 bg-gray-700 focus:border-gray-500',
					} }
					value={ value }
					placeholder={ t('search') }
					size="sm"
					variant='bordered'
					endContent={ <Button type='submit' isIconOnly aria-label='Search' color='primary' className='rounded-xs'>
						<Icons.SearchIcon className='fill-black'/>
					</Button> }
					type='search'
				/>
			</form>
			<div ref={ dropdownRef } className={ twMerge(
				'absolute top-12 right-0 z-20 py-6 px-6 md:px-10 bg-gray-800 text-white rounded-sm w-full lg:max-w-[460px]',
				value.length < 2 && 'hidden'
			) }>
				<CloseButton handleClick={ handleClick }/>
				<ul className='mb-8'>
					<Spinner height='h-20' show={ !data }>
						{ data?.result ? data.data.products?.map(item => {
							return <li key={ item.group } className='my-3'>
								<Link className='hover:underline' onClick={ handleClick } href={ `/${ item.page_url }` }>
									{ item.full_name }
								</Link>
							</li>
						}) : <p>{ t('no result by search') }</p> }
					</Spinner>
				</ul>
				{ data?.result && <Link className='btn primary mx-auto' onClick={ handleClickAllProduct } href='/search'>
					{ t('all search result') + ' ' }
					({ data?.data.total_count })
				</Link> }
			</div>
		</div>
	)
};

export default Search;
