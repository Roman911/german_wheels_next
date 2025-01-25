'use client';
import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { ToastContainer, toast } from 'react-toastify';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import * as Icons from '@/components/Lib/Icons';
import type { Product } from '@/models/products';
import { Language } from '@/models/language';
import noPhoto from '@/public/images/no-photo.jpg';
import noPhotoRu from '@/public/images/no-photo-ru.jpg';
import { Button } from '@/components/UI';

const icons = {
	1: Icons.CarIcon,
	2: Icons.SuvIcon,
	7: Icons.MotorcyclesIcon,
	8: Icons.BusIcon,
	9: Icons.CargoIcon,
};

interface Props {
	locale: string
	item: Product
}

const ProductCard: FC<Props> = ({ locale, item }) => {
	const t = useTranslations('Main');
	const { default_photo, full_name, sku, min_price, season, vehicle_type, page_url } = item;
	const seasonIcon = season === '1' ? 'sun' : season === '2' ? 'snow' : season === '3' ? 'all-season' : undefined;
	const vehicle_type_number = vehicle_type as unknown as keyof typeof icons;
	const Icon = icons[vehicle_type_number] || null;
	const notify = () => toast("Wow so easy!");

	// const handleClick = () => {
	// 	console.log('click')
		// onAddToCart(item, t(section, true), 1);
		// if(!cartStorage?.find((item: { [section]: number, quantity: number }) => item.[section] === best_offer.[section])) {
		// 	const cart = [ ...cartStorage, { [section]: best_offer.[section], section: dopServices ? dopServicesSection : sectionNew, quantity: 1 }];
		// 	dispatch(addCart({ [section]: best_offer.[section], quantity: 1, section: dopServices ? dopServicesSection : sectionNew }));
		// 	addToStorage('reducerCart', cart);
		// }
		// navigate( lang === Language.UA ?'/cart' : '/ru/cart');
	// };

	return (
		<Card shadow="sm" className='max-w-[360px] rounded-sm pt-7 px-4 pb-5'>
			<Link href={ `/${locale}/${page_url}` }>
				<CardHeader className='relative min-h-72 sm:min-h-52 justify-center'>
					<div className='absolute left-0 top-0'>
						{ seasonIcon && <Image
							src={ `/icons/${seasonIcon}.svg` }
							alt=''
							width={ 24 }
							height={ 24 }
							priority
						/> }
						{ Icon && <Icon className={ twMerge('fill-gray-500', vehicle_type === '2' && 'stroke-gray-500') }/> }
					</div>
					<div className='absolute right-0 group-hover:visible flex flex-col'>
						{/*<button onClick={ event => addToDefense(event, group) }>*/}
						{/*	<Icons.HeartIcon*/}
						{/*		className={ classNames('stroke-[#8D8E90] hover:stroke-blue-300', { 'stroke-blue-300 fill-blue-300': isBookmarks }) }/>*/}
						{/*</button>*/}
						{/*<button onClick={ event => addToComparison(event, group) }>*/}
						{/*	<Icons.LibraIcon*/}
						{/*		className={ classNames('mt-5 fill-[#8D8E90] hover:fill-blue-300', { 'fill-blue-300': isComparison }) }/>*/}
						{/*</button>*/}
					</div>
					<Image
						src={ default_photo || (locale === Language.UA ? noPhoto : noPhotoRu) }
						alt={ full_name }
						width={ 220 }
						height={ 220 }
					/>
				</CardHeader>
				<CardBody>
					<p className='font-bold my-2.5 min-h-12 text-center'>{ full_name }</p>
					<div className='text-sm text-gray-500 my-2.5 text-center'>
						<span>Артикул: </span><span>{ sku }</span>
					</div>
					<div className='flex items-end justify-center mt-2.5 mb-4'>
						<div className='text-sm font-medium mb-0.5 mr-1'>{ t('from') }</div>
						<div className='text-2xl font-bold'>{ min_price } ₴</div>
					</div>
					{/*<Rating commentsCount={ undefined } commentsAvgRate={ 0 }/>*/}
				</CardBody>
			</Link>
			<CardFooter>
				<Button onPress={ notify } className='w-full relative z-10'>
					{ t('buy') }
				</Button>
			</CardFooter>
			<ToastContainer hideProgressBar={ true } />
		</Card>
	)
};

export default ProductCard;
