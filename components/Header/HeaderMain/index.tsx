import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import Logo from '@/components/Logo';
import Navbar from '@/components/Header/HeaderMain/Navbar';
import styles from './index.module.scss';

interface Props {
	locale: string
}

const HeaderMain: FC<Props> = ({ locale }) => {
	return (
		<div className={twMerge('bg-natural-800 relative', styles['header-main'])}>
			<div className={
				twMerge('container mx-auto grid items-center py-3 px-4 grid-cols-2 lg:grid-cols-[180px_auto_400px_150px]',
					styles.container)
			}>
				<Logo locale={ locale } />
				<Navbar locale={ locale } />
			</div>
		</div>
	)
};

export default HeaderMain;
