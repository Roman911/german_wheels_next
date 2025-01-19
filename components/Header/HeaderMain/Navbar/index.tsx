'use client'
import { FC, useRef, useState, MouseEvent, SetStateAction } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { CarTireFilter } from '../CarTireFilter';
import { CarDiskFilter } from '../CarDiskFilter';
import * as Icons from '@/components/Lib/Icons';
import { links } from '../../links';

interface Props {
	locale: string
}

const Navbar: FC<Props> = ({ locale }) => {
	const t = useTranslations('Main');
	const [ open, setOpen ] = useState(false);
	const [ section, setSection ] = useState('tires');
	const filterRef = useRef<HTMLDivElement>(null);

	const handleClick = (event: MouseEvent<HTMLButtonElement>, value: SetStateAction<string>) => {
		event.stopPropagation();
		setOpen(!(open && section === value));
		if(section !== value) {
			setSection(value);
		}
	};

	const ButtonMeu = ({ sectionItem, label }: { sectionItem: string, label: string }) => (
		<button
			type='button'
			onClick={ event => handleClick(event, sectionItem) }
			className={
				twMerge('inline-flex items-center gap-x-1.5 font-semibold group transition hover:text-teal-300 outline-none',
					(open && section === sectionItem) && 'text-teal-300'
				) }
		>
			<span>{ label }</span>
			<span className='transition'>
					<Icons.ChevronDownIcon
						width='14'
						height='14'
						strokeWidth='2'
						className={
							twMerge('stroke-white transition group-hover:stroke-teal-300',
								(open && section === sectionItem) && 'stroke-teal-300 rotate-180')
						}
					/>
				</span>
		</button>
	)

	return (
		<div className='hidden lg:block'>
			<nav className='container text-lg mx-auto max-w-7xl flex justify-between items-center gap-8 p-5 pr-8'>
				{[{ section: 'tires', label: t('tires') }, { section: 'disks', label: t('disks') }]
					.map((item, i) => {
						return <ButtonMeu key={ i } sectionItem={ item.section } label={ item.label } />
					})}
				{ links.map((item, index) => {
					return <Link key={ index } href={ `/${locale}/${item.url}` }
											 className='font-semibold hover:text-blue-200'>
						{ t(item.title) }
					</Link>
				}) }
			</nav>
			<div
				ref={ filterRef }
				className={ twMerge('absolute left-0 right-0 top-24 z-30 flex w-full -mt-0.5', !open && 'hidden') }>
				<div
					className='w-full overflow-hidden bg-natural-900 shadow-lg pt-8 pb-6 font-normal'>
					<div className='flex-auto max-w-7xl grid grid-cols-4 mx-auto px-4'>
						{ section === 'tires' ? <CarTireFilter setOpen={ setOpen } locale={ locale } /> :
							<CarDiskFilter setOpen={ setOpen } locale={ locale } /> }
					</div>
				</div>
			</div>
		</div>
	)
};

export default Navbar;
