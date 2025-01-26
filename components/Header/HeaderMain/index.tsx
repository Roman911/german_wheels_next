import { FC } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Logo from '@/components/Logo';
import Navbar from '@/components/Header/HeaderMain/Navbar';
import Search from '@/components/Header/HeaderMain/Search';
// import Badge from '@/components/Lib/Badge';
import { Language } from '@/models/language';
import * as Icons from '@/components/Lib/Icons';
import styles from './index.module.scss';

interface Props {
	locale: Language
}

const HeaderMain: FC<Props> = ({ locale }) => {
	return (
		<div className={twMerge('bg-gray-800 relative', styles['header-main'])}>
			<div className={
				twMerge('container mx-auto grid items-center py-3 px-4 grid-cols-2 lg:grid-cols-[180px_auto_400px_150px]',
					styles.container)
			}>
				<Logo locale={ locale } />
				<Navbar locale={ locale } />
				<Search locale={ locale } />
				<div className={twMerge('flex gap-4 md:gap-7 justify-end pr-2.5', styles.menu)}>
					<Link href={ `/${locale}/comparison` } className='relative'>
						{/*{ comparisonItems.length > 0 && <Badge value={ comparisonItems.length } /> }*/}
						<Icons.LibraIcon className='fill-white' />
					</Link>
					<Link href={ `/${locale}/bookmarks` } className='relative'>
						{/*{ bookmarksItems.length > 0 && <Badge value={ bookmarksItems.length } /> }*/}
						<Icons.HeartIcon className='stroke-white' />
					</Link>
					<Link href={ `/${locale}/cart` } className='relative'>
						{/*{ cartItems.length > 0 && <Badge value={ cartItems.length } /> }*/}
						<Icons.CartIcon className='stroke-white' />
					</Link>
					{/*<button onClick={() => setOpenMenu(prev => !prev)} className='lg:hidden'>*/}
					{/*	{ openMenu ? <Icons.CloseIcon className='stroke-white' /> : <Icons.MenuIcon className='fill-white'/> }*/}
					{/*</button>*/}
				</div>
			</div>
		</div>
	)
};

export default HeaderMain;
