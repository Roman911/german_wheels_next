'use client';
import { useRouter } from 'next/navigation';
import { FC, useMemo } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import Link from '@/components/Lib/Link';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addCart } from '@/store/slices/cartSlice';
import * as Icons from '@/components/Lib/Icons';
import type { Product } from '@/models/products';
import { Language } from '@/models/language';
import noPhoto from '@/public/images/no-photo.jpg';
import noPhotoRu from '@/public/images/no-photo-ru.jpg';
import { addToStorage, getFromStorage, removeFromStorage } from '@/lib/localeStorage';
import { Section } from '@/models/filter';
import { addBookmarks, removeBookmarks } from '@/store/slices/bookmarksSlice';
import { addComparison, removeComparison } from '@/store/slices/comparisonSlice';
import Rating from '@/components/Lib/Rating';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Button } from '@/components/UI';

const icons = {
	1: Icons.CarIcon,
	2: Icons.SuvIcon,
	7: Icons.MotorcyclesIcon,
	8: Icons.BusIcon,
	9: Icons.CargoIcon,
};

const cargo = [ '3', '4', '5', '6', '9', '10', '11' ];
const toggleStorageItem = (storageKey: string, id: number, section: string, isInStorage: boolean) => {
	if(isInStorage) {
		removeFromStorage(storageKey, id);
	} else {
		const storage = getFromStorage(storageKey) || [];
		addToStorage(storageKey, [ ...storage, { id, section } ]);
	}
};

interface Props {
	locale: string
	item: Product
}

const ProductCard: FC<Props> = ({ locale, item }) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const t = useTranslations('Main');
	const { default_photo, full_name, sku, min_price, season, vehicle_type, page_url, best_offer } = item;
	const seasonIcon = season === '1' ? 'sun' : season === '2' ? 'snow' : season === '3' ? 'all-season' : undefined;
	const vehicle_type_number = vehicle_type as unknown as keyof typeof icons;
	const Icon = icons[vehicle_type_number] || null;
	const cartStorage = useMemo(() => getFromStorage('reducerCart'), []);
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const { comparisonItems } = useAppSelector(state => state.comparisonReducer);
	const isBookmarks = bookmarksItems.some(i => i.id === item.group);
	const isComparison = comparisonItems.some(i => i.id === item.group);
	const section = item.vehicle_type ? Section.Tires : Section.Disks;
	const sectionNew = section === Section.Tires ? cargo.includes(item.vehicle_type) ? 'cargo' : 'tires' : section;

	const handleClick = () => {
		if(!cartStorage?.find((item: { id: number, quantity: number }) => item.id === best_offer.id)) {
			const cart = [ ...cartStorage, {
				id: best_offer.id,
				section: sectionNew,
				quantity: 1
			} ];
			dispatch(addCart({ id: best_offer.id, quantity: 1, section }));
			addToStorage('reducerCart', cart);
		}
		router.push(`/${ locale }/cart`)
	};

	const handleToggle = (
		id: number,
		isItem: boolean,
		addAction: ({ id, section }: { id: number, section: string }) => {
			type: string,
			payload: { id: number, section: string }
		}, // Ensure actions return objects
		removeAction: (id: number) => { type: string, payload: number },
		storageKey: string
	) => {
		dispatch(isItem ? removeAction(id) : addAction({ id, section: sectionNew }));
		toggleStorageItem(storageKey, id, sectionNew, isItem);
	};

	const addToDefense = () => {
		handleToggle(item.group, isBookmarks, addBookmarks, removeBookmarks, 'reducerBookmarks')
	}

	const addToComparison = () => {
		handleToggle(item.group, isComparison, addComparison, removeComparison, 'reducerComparison')
	}

	return (
		<Card radius='none' className='relative'>
			<CardBody>
				<div className='relative min-h-72 sm:min-h-52 text-center'>
					<div className='absolute left-0 top-0'>
						{ seasonIcon && <Image
							src={ `/icons/${ seasonIcon }.svg` }
							alt=''
							width={ 24 }
							height={ 24 }
							priority
						/> }
						{ Icon && <Icon className={ twMerge('fill-gray-500', vehicle_type === '2' && 'stroke-gray-500') }/> }
					</div>
					<div className='absolute right-0 group-hover:visible flex flex-col z-10'>
						<Button isIconOnly onPress={ addToDefense } variant='light' color='primary' aria-label='Bookmarks'
										className='group hover:bg-gray-100 rounded-md'>
							<Icons.HeartIcon className={
								twMerge('stroke-[#8D8E90] group-hover:stroke-teal-300', isBookmarks && 'stroke-teal-300 fill-teal-300')
							}/>
						</Button>
						<Button isIconOnly onPress={ addToComparison } variant='light' color='primary' aria-label='Bookmarks'
										className='group hover:bg-gray-100 rounded-md'>
							<Icons.LibraIcon
								className={ twMerge('fill-[#8D8E90] group-hover:fill-teal-300', isComparison && 'fill-teal-300')
								}/>
						</Button>
					</div>
					<Image
						className='mx-auto'
						src={ default_photo || (locale === Language.UK ? noPhoto : noPhotoRu) }
						alt={ full_name }
						width={ 220 }
						height={ 220 }
					/>
				</div>
				<Link href={ `/${ page_url }` }
							className='font-bold my-2.5 min-h-12 text-center after:absolute after:inset-0'>{ full_name }</Link>
				<div className='text-sm text-gray-500 my-2.5 text-center'>
					<span>Артикул: </span><span>{ sku }</span>
				</div>
				<div className='flex items-end justify-center mt-2.5 mb-4'>
					<div className='text-sm font-medium mb-0.5 mr-1'>{ t('from') }</div>
					<div className='text-2xl font-bold'>{ min_price } ₴</div>
				</div>
				<Rating commentsCount={ undefined } commentsAvgRate={ 0 }/>
			</CardBody>
			<CardFooter>
				<Button className='relative w-full' onPress={ handleClick }>
					{ t('buy') }
				</Button>
			</CardFooter>
		</Card>
	)
};

export default ProductCard;
