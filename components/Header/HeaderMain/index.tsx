'use client'
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { Badge } from "@heroui/react";
import Logo from '@/components/Logo';
import Navbar from '@/components/Header/HeaderMain/Navbar';
import Search from '@/components/Header/HeaderMain/Search';
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
	const [bookmarks, setBookmarks] = useState(0);
	const [comparison, setComparison] = useState(0);
	const [cart, setCart] = useState(0);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const bookmarksStorage = getFromStorage('reducerBookmarks') || [];
		const comparisonStorage = getFromStorage('reducerComparison') || [];
		const cartStorage = getFromStorage('reducerCart') || [];

		if (bookmarksStorage.length !== 0) {
			setComparison(comparisonStorage.length);
			dispatch(addBookmarksFromStorage(bookmarksStorage));
		}
		if (comparisonStorage.length !== 0) {
			setBookmarks(bookmarksStorage.length);
			dispatch(addComparisonFromStorage(comparisonStorage));
		}
		if (cartStorage.length !== 0) {
			setCart(cartStorage.length)
			dispatch(addCartFromStorage(cartStorage));
		}
	}, [dispatch]);

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
						<Badge
							color='primary'
							content={ comparison }
							isInvisible={ comparison === 0 }
							className='text-black  border-zinc-800'
						>
							<Icons.LibraIcon className='fill-white'/>
						</Badge>
					</Link>
					<Link href={ `/${ locale }/bookmarks` } className='relative'>
						<Badge
							color='primary'
							content={ bookmarks }
							isInvisible={ bookmarks === 0 }
							className='text-black  border-zinc-800'
						>
							<Icons.HeartIcon className='stroke-white'/>
						</Badge>
					</Link>
					<Link href={ `/${ locale }/cart` } className='relative'>
						<Badge
							color='primary'
							content={ cart }
							isInvisible={ cart === 0 }
							className='text-black  border-zinc-800'
						>
							<Icons.CartIcon className='stroke-white'/>
						</Badge>
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
