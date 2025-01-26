'use client'
import Link from 'next/link';
import { FC, MouseEvent } from 'react';
import { useTranslations } from 'next-intl';
import type { Product } from '@/models/products';
import CloseButton from '@/components/Lib/CloseButton';
import { Characteristics } from '../Characteristics';
import * as Icons from '../../Lib/Icons';

interface ItemWrapperProps {
	characteristics: Product[]
	tab: string
	name: 'tires' | 'cargo' | 'disks' | 'battery'
	handleClick: (id: number) => void
	onClick: (offerId: number, section: string) => void
}

export const ItemWrapper: FC<ItemWrapperProps> = (
	{
		characteristics,
		name,
		tab,
		handleClick,
		onClick,
	}) => {
	const t = useTranslations('Main');

	const removeClick = (event: MouseEvent<HTMLDivElement | HTMLButtonElement>, id: number) => {
		event.preventDefault();
		handleClick(id);
	}

	return characteristics.map(item => {
		return <div key={item.group}>
			<div className='w-60 relative m-1 min-h-60 bg-white'>
				<Link href={`/${item.page_url}`}>
					<CloseButton handleClick={(event) => removeClick(event, item.product_id)} />
					<img src={item.default_photo} alt=""/>
					<div
						className='absolute bottom-0 px-2 text-center bg-gray-500 rounded-sm h-20 flex items-center justify-center w-full whitespace-normal'>
						<p className='text-white text-center font-bold'>
							{ item.full_name }
						</p>
					</div>
				</Link>
			</div>
			<div className='divide-y divide-[#D0D4D9] text-center'>
				<Characteristics name={ name } item={ item } />
				<div className='pt-8 pb-14'>
					<Link href={ `/cart` } onClick={() => onClick(item.best_offer.id, tab)} className='btn primary uppercase w-full md:w-52 mx-auto'>
						<Icons.CartIcon className='stroke-black'/>
						<span className='ml-2.5'>{t('buy')}</span>
					</Link>
				</div>
			</div>
		</div>
	})
};
