'use client';
import { Dispatch, FC, SetStateAction } from 'react';
import Image from 'next/image';
import { ProductPaired, Product } from '@/models/products';
import { Card, CardBody } from '@heroui/react';
import { Language } from '@/models/language';
import noPhoto from '@/public/images/no-photo.jpg';
import noPhotoRu from '@/public/images/no-photo-ru.jpg';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/UI';
import { useTranslations } from 'next-intl';
import { SeasonTransform } from '@/lib/characteristicsTransform';

interface Props {
	locale: string
	item: ProductPaired
	onOpen: () => void
	setGroup: Dispatch<SetStateAction<number>>
}

const ProductPairedCard: FC<Props> = ({ locale, item, onOpen, setGroup }) => {
	const t = useTranslations('PairedCard');

	const Item = ({ product }: { product: Product }) => {
		const { group, page_url, country, sku, season, min_price, size } = product;
		const seasonTransform = season && SeasonTransform(season)?.name;

		const onClick = () => {
			setGroup(group);
			onOpen();
		}

		return (
			<div className="mb-2 flex justify-between items-start flex-col md:flex-row">
				<div className="flex flex-col gap-2">
					<div className='text-sm text-gray-500'>
						<span>{ t('size') }: </span>
						<Link href={ `/${ page_url }` } className='font-medium text-blue-800 hover:underline'>
							{ size }
						</Link>
					</div>
					<div className='text-sm text-gray-500'>
						<span>Артикул: </span><span>{ sku }</span>
					</div>
					<p className="text-small text-foreground/80">{ t('country') }: { country }</p>
					{ seasonTransform && <p className="text-small text-foreground/80">{ t('season') }: { t(seasonTransform) }</p> }
				</div>
				<div className='flex md:flex-col w-full md:w-auto'>
					<div className='flex items-end justify-center mt-2.5 mb-4 w-full'>
						<div className='text-sm font-medium mb-0.5 mr-1'>{ t('from') }</div>
						<div className='text-xl font-bold'>{ min_price } ₴</div>
					</div>
					<Button className='relative w-full' onPress={ onClick }>
						{ t('buy') }
					</Button>
				</div>
			</div>
		)
	}

	return (
		<Card
			className="border-none bg-background/60 dark:bg-default-100/50 w-full"
			shadow="sm"
			radius='none'
		>
			<CardBody>
				<div className="grid grid-cols-9 md:grid-cols-12 gap-6 md:gap-4 justify-center">
					<div className="relative col-span-3 md:col-span-3">
						<Image
							className='mx-auto'
							src={ item.brand_image || (locale === Language.UK ? noPhoto : noPhotoRu) }
							alt={ `${ item.brand_name } ${ item.model.name }` }
							width={ 160 }
							height={ 160 }
						/>
						<div className='mt-2 text-center text-lg font-semibold'>{ `${ item.brand_name } ${ item.model.name }` }</div>
					</div>
					<div className="flex flex-col col-span-6 md:col-span-9">
						<div className='mb-2 text-lg font-semibold'>
							{ t('front axle') }
						</div>
						{ item.front.map(i => {
							return <Item key={ i.group } product={ i } />
						}) }
						<div className='mb-2 mt-4 text-lg font-semibold'>
							{ t('rear axle') }
						</div>
						{ item.rear.map(i => {
							return <Item key={ i.group } product={ i } />
						}) }
					</div>
				</div>
			</CardBody>
		</Card>
	)
};

export default ProductPairedCard;
