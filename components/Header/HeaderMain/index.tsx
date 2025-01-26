'use client'
import { FC, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Logo from '@/components/Logo';
import Navbar from '@/components/Header/HeaderMain/Navbar';
import Search from '@/components/Header/HeaderMain/Search';
import Badge from '@/components/Lib/Badge';
import { getFromStorage } from '@/lib/localeStorage';
import { useAppDispatch } from '@/hooks/redux';
import { addBookmarksFromStorage } from '@/store/slices/bookmarksSlice';
import { addComparisonFromStorage } from '@/store/slices/comparisonSlice';
import { addCartFromStorage } from '@/store/slices/cartSlice';
import { Language } from '@/models/language';
import * as Icons from '@/components/Lib/Icons';
import styles from './index.module.scss';

interface Props {
	locale: Language
}

const HeaderMain: FC<Props> = ({ locale }) => {
	const dispatch = useAppDispatch();
	const bookmarksStorage = useMemo(() => getFromStorage('reducerBookmarks'), []);
	const comparisonStorage = useMemo(() => getFromStorage('reducerComparison'), []);
	const cartStorage = useMemo(() => getFromStorage('reducerCart'), []);

	useEffect(() => {
		if(bookmarksStorage.length !== 0) dispatch(addBookmarksFromStorage(bookmarksStorage));
		if(comparisonStorage.length !== 0) dispatch(addComparisonFromStorage(comparisonStorage));
		if(cartStorage.length !== 0) dispatch(addCartFromStorage(cartStorage));
	}, [bookmarksStorage, cartStorage, comparisonStorage, dispatch]);

	return (
		<div className={ twMerge('bg-gray-800 relative', styles['header-main']) }>
			<div className={
				twMerge('container mx-auto grid items-center py-3 px-4 grid-cols-2 lg:grid-cols-[180px_auto_400px_150px]',
					styles.container)
			}>
				<Logo locale={ locale }/>
				<Navbar locale={ locale }/>
				<Search locale={ locale }/>
				<div className={ twMerge('flex gap-4 md:gap-7 justify-end pr-2.5', styles.menu) }>
					<Link href={ `/${ locale }/comparison` } className='relative'>
						{ comparisonStorage.length > 0 && <Badge value={ comparisonStorage.length } /> }
						<Icons.LibraIcon className='fill-white'/>
					</Link>
					<Link href={ `/${ locale }/bookmarks` } className='relative'>
						{ bookmarksStorage.length > 0 && <Badge value={ bookmarksStorage.length } /> }
						<Icons.HeartIcon className='stroke-white'/>
					</Link>
					<Link href={ `/${ locale }/cart` } className='relative'>
						{ cartStorage.length > 0 && <Badge value={ cartStorage.length } /> }
						<Icons.CartIcon className='stroke-white'/>
					</Link>
					{/*<button onClick={() => setOpenMenu(prev => !prev)} className='lg:hidden'>*/ }
					{/*	{ openMenu ? <Icons.CloseIcon className='stroke-white' /> : <Icons.MenuIcon className='fill-white'/> }*/ }
					{/*</button>*/ }
				</div>
			</div>
		</div>
	)
};

export default HeaderMain;
