import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import logo from '@/public/logo.svg';
import footerLogo from '@/public/logo-footer.svg';

interface Props {
	locale: string;
	isFooter?: boolean;
}

const Logo: FC<Props> = ({ locale, isFooter }) => {
	return (
		<Link href={`/${locale}/`} className='logo'>
			<Image
				className={ twMerge('hidden', !isFooter && 'md:block') }
				src={ logo }
				alt="logo"
				width={ 140 }
				height={ 70 }
				priority
			/>
			<Image
				className={ twMerge(!isFooter && 'md:hidden w-24') }
				src={ footerLogo }
				alt="logo"
				width={ 106 }
				height={ 55 }
				priority
			/>
		</Link>
	)
};

export default Logo;
