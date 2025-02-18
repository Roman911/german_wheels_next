'use client'
import { FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@heroui/react";
import { Link } from '@/i18n/routing';
import Logo from '@/components/Logo';
import MyNavbar from '@/components/Layout/Header/HeaderMain/Navbar';
import Search from '@/components/Layout/Header/HeaderMain/Search';
import { getFromStorage } from '@/lib/localeStorage';
import { useAppDispatch } from '@/hooks/redux';
import { addBookmarksFromStorage } from '@/store/slices/bookmarksSlice';
import { addComparisonFromStorage } from '@/store/slices/comparisonSlice';
import { addCartFromStorage } from '@/store/slices/cartSlice';
import { Language } from '@/models/language';
import * as Icons from '@/components/Lib/Icons';
import styles from './index.module.scss';
import { CarTireFilter } from '@/components/Layout/Header/HeaderMain/CarTireFilter';
import { CarDiskFilter } from '@/components/Layout/Header/HeaderMain/CarDiskFilter';
import { links } from '@/components/Layout/Header/links';
import ButtonBlock from '@/components/Layout/Header/HeaderMain/ButtonBlock';

interface Props {
	locale: Language
}

const HeaderMain: FC<Props> = ({ locale }) => {
	const t = useTranslations('Main');
	const [ isMenuOpen, setIsMenuOpen ] = useState(false);
	const [ filterIsOpen, setFilterOpen ] = useState<boolean | string>(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const bookmarksStorage = getFromStorage('reducerBookmarks') || [];
		const comparisonStorage = getFromStorage('reducerComparison') || [];
		const cartStorage = getFromStorage('reducerCart') || [];

		if(bookmarksStorage.length !== 0) {
			dispatch(addBookmarksFromStorage(bookmarksStorage));
		}
		if(comparisonStorage.length !== 0) {
			dispatch(addComparisonFromStorage(comparisonStorage));
		}
		if(cartStorage.length !== 0) {
			dispatch(addCartFromStorage(cartStorage));
		}
	}, [ dispatch ]);

	const handleClick = (value: boolean | string) => {
		if(filterIsOpen !== value) {
			setFilterOpen(value);
		} else {
			setFilterOpen(false);
		}
	};

	const closeFilter = () => {
		setFilterOpen(false);
		setIsMenuOpen(false);
	}

	return (
		<Navbar
			maxWidth='2xl'
			isMenuOpen={ isMenuOpen }
			onMenuOpenChange={ setIsMenuOpen }
			className={ twMerge('bg-gray-800 relative') }
			classNames={ { wrapper: twMerge('grid h-40 md:h-24 items-center justify-normal py-3 px-4 grid-cols-2 lg:grid-cols-[140px_auto_auto_150px]', styles['container']) } }
		>
			<NavbarContent className={ styles.logo }>
				<NavbarBrand>
					<Logo />
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className='hidden sm:block'>
				<MyNavbar />
			</NavbarContent>
			<NavbarContent className={ styles.search }>
				<Search locale={ locale }/>
			</NavbarContent>
			<NavbarContent justify='end'>
				<ButtonBlock />
				<NavbarMenuToggle className="sm:hidden" aria-label={ isMenuOpen ? "Close menu" : "Open menu" }/>
			</NavbarContent>
			<NavbarMenu className={ twMerge('mt-36 bg-white pt-4', styles.menu) }>
				<NavbarMenuItem>
					<button
						onClick={ () => handleClick('tires') }
						className={ twMerge('px-5 py-2 w-full flex items-center justify-between uppercase font-bold group transition hover:text-teal-600',
							filterIsOpen === 'tires' && 'text-teal-600') }
					>
						<span>{ t('cartires') }</span>
						<span className={ twMerge('transition', filterIsOpen === 'tires' && 'rotate-180') }>
						<Icons.ChevronDownIcon
							className={ twMerge('stroke-black transition group-hover:stroke-teal-600', filterIsOpen === 'tires' && 'stroke-teal-600') }/>
					</span>
					</button>
					{ filterIsOpen === 'tires' &&
						<div className='mt-4 grid grid-cols-2 gap-2'>
							<CarTireFilter closeFilter={ closeFilter } />
						</div>
					}
				</NavbarMenuItem>
				<NavbarMenuItem>
					<button
						onClick={ () => handleClick('disks') }
						className={ twMerge('px-5 py-2 w-full flex items-center justify-between uppercase font-bold group transition hover:text-teal-600',
							filterIsOpen === 'disks' && 'text-teal-600'
						) }>
						<span>{ t('cardiscs') }</span>
						<span className={ twMerge('transition', filterIsOpen === 'disks' && 'rotate-180') }>
						<Icons.ChevronDownIcon
							className={ twMerge('stroke-black transition group-hover:stroke-teal-600', filterIsOpen === 'disks' && 'stroke-teal-600') }/>
					</span>
					</button>
					{ filterIsOpen === 'disks' &&
						<div className='mt-5 grid grid-cols-2 gap-2'>
							<CarDiskFilter closeFilter={ closeFilter } />
						</div>
					}
				</NavbarMenuItem>
				{ links.map((item, index) => {
					return <NavbarMenuItem key={ index }>
						<Link
							href={ item.url }
							onClick={ () => closeFilter() }
							className='py-2 px-5 block uppercase font-bold'
						>
							{ t(item.title) }
						</Link>
					</NavbarMenuItem>
				}) }
			</NavbarMenu>
		</Navbar>
	)
};

export default HeaderMain;
