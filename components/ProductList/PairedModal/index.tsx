import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter, Spinner
} from "@heroui/react";
import { Button } from '@/components/UI';
import { baseDataAPI } from '@/services/baseDataService';
import Rating from '@/components/Lib/Rating';
import { Language } from '@/models/language';
import noPhoto from '@/public/images/no-photo.jpg';
import noPhotoRu from '@/public/images/no-photo-ru.jpg';
import CountryInfo from '@/components/Lib/CountryInfo';
import { countryCodeTransform } from '@/lib/countryCodetransform';
import { addToStorage, getFromStorage } from '@/lib/localeStorage';
import { Section } from '@/models/filter';
import Quantity from '@/components/Lib/Quantity';
import { Link } from '@/i18n/routing';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addCart } from '@/store/slices/cartSlice';

interface Props {
	idProduct: number
	locale: string
	isOpen: boolean
	onOpenChange: () => void
}

const PairedModal: FC<Props> = ({ idProduct, locale, isOpen, onOpenChange }) => {
	const dispatch = useAppDispatch();
	const [ offerId, setOfferId ] = useState(0);
	const [ quantity, setQuantity ] = useState(2);
	const { cartItems } = useAppSelector(state => state.cartReducer);
	const t = useTranslations('Main');
	const { data, isLoading } = baseDataAPI.useFetchProductQuery(idProduct.toString());
	const { id = 0, full_name = '', offers = [] } = data?.data || {};
	const offer = offers.find(item => item.offer_id === offerId);
	const review = data?.data.review;
	const commentsAvgRateSum = review && review.length > 0
		? review.reduce((sum, current) => sum + (current.score || 0), 0) : 0;
	const averageScore = review && review.length > 0 ? commentsAvgRateSum / review.length : undefined;

	useEffect(() => {
		const storage = getFromStorage('reducerRecentlyViewed');
		const updatedStorage = storage.filter((item: { id: number, section: Section }) => item.id !== idProduct);
		const deleteElement = updatedStorage.length === 4 ? updatedStorage.slice(1, 3) : updatedStorage;
		addToStorage('reducerRecentlyViewed', [ ...deleteElement, { id: idProduct, section: 'tires' } ]);
	}, [id, idProduct]);

	useEffect(() => {
		if(data) setOfferId(data.data.offers[0].offer_id);
	}, [ data ]);

	const handleClick = (id: number) => {
		setOfferId(id);
		setQuantity(2);
	}

	const onChange = (e: { target: HTMLInputElement }) => {
		const value = e.target.value;
		const onlyNumbers = value.replace(/\D/g, '');
		const numericValue = Number(onlyNumbers);

		setQuantity(numericValue < Number(offer?.quantity) ? numericValue : Number(offer?.quantity));
	}

	const onSetQuantity = (_: number, quan: number) => {
		setQuantity(quan);
	}

	const onSubmit = () => {
		const cartStorage = getFromStorage('reducerCart');
		const cart = [ ...cartStorage, { id: offerId, section: 'tires', quantity } ];
		dispatch(addCart({ id: offerId, section: 'tires', quantity }));
		addToStorage('reducerCart', cart);
	}

	return (
		<Modal
			isOpen={ isOpen }
			onOpenChange={ onOpenChange }
			placement='top'
			radius='none'
			size='2xl'
			classNames={{
				header: "border-b-[1px] border-gray-300",
				footer: "border-t-[1px] border-gray-300",
			}}
		>
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1">{ full_name }</ModalHeader>
				<ModalBody>
					{ isLoading ? <Spinner size="lg" /> : <div className='grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 justify-center'>
						<div className='relative col-span-6 md:col-span-3'>
							<Image
								className='mx-auto'
								src={ data?.data.photo.url_part || (locale === Language.UK ? noPhoto : noPhotoRu) }
								alt={ full_name || '' }
								width={ 160 }
								height={ 160 }
							/>
						</div>
						<div className='col-span-6 md:col-span-9'>
							<div className='flex mt-5 items-center'>
								<div className='text-[15px] text-gray-700 bg-gray-300 rounded-2 py-1 md:py-1 px-3 mr-5'>Артикул: { data?.data.offer_group.sku }</div>
								<Rating
									commentsCount={ review ? (review.length > 0 ? review.length : undefined) : undefined }
									commentsAvgRate={ averageScore || 0 }
								/>
							</div>
							<div className='flex justify-between mt-4'>
								<div>
									<div className='flex items-end'>
										<div className='mr-2.5 text-xl font-medium'>{ t('from') }</div>
										<div className='text-3xl font-bold mr-2.5'>{ data?.data.min_price } ₴</div>
										<div className='text-xl font-medium'>/шт.</div>
									</div>
									<div className='mt-3 text-gray-500'>
										{ t('from') } <span className='font-bold'>{ data?.result && data.data.min_price * 2 } ₴ </span> за 2 шт.
									</div>
								</div>
							</div>
							<div className='offers mt-7 mb-5'>
								{ data?.result && data.data.offers.map(item => {
									return <div
										key={ item.offer_id }
										onClick={ () => handleClick(item.offer_id) }
										className='offers__item cursor-pointer grid-cols-3 grid md:grid-cols-7 gap-1 md:gap-4 items-center mt-3 py-2.5 md:py-0 px-2.5 md:px-0 bg-white md:bg-transparent border md:border-0 rounded-full'
									>
										<div className='input flex flex-row md:col-span-2 relative'>
											<input
												type="checkbox"
												onChange={ () => handleClick(item.offer_id) }
												checked={ item.offer_id === offerId }
												className='appearance-none h-6 w-6 bg-white rounded-full border border-zinc-400 hover:border-teal-600 checked:border-teal-600 transition-all duration-200 peer'
											/>
											<div
												className='h-4 w-4 absolute inset-1 rounded-full peer-checked:border-teal-600 peer-checked:bg-teal-600'
											/>
											<label className='flex ml-1.5 md:ml-7 flex-col justify-center font-medium cursor-pointer'>
												{ item.quantity } шт.
											</label>
										</div>
										<div className='country md:col-span-3'>
											<CountryInfo
												country={ locale === Language.UK ? item.country : item.country_ru }
												countryCode={ countryCodeTransform(item.country) } year={ item.year }
												mobileHidden={ true }
											/>
										</div>
										<div className='price md:col-span-2 font-bold content-center'>
											{ item.price } грн
										</div>
									</div>
								}) }
							</div>
						</div>
					</div> }
				</ModalBody>
				<ModalFooter className='grid grid-cols-3 md:grid-cols-9 items-center'>
					<div className='col-span-3 md:col-span-4 md:col-start-3'>
						<Quantity id={ 0 } quantity={ quantity } offerQuantity={ (Number(offer?.quantity) || 0) } price={ offer?.price } onChange={ onChange } setQuantity={ onSetQuantity }/>
					</div>
					<div className='col-span-3'>
						{ cartItems.find(item => item.id === offerId) ?
							<Button as={ Link } href={ `/cart` } color='success' className='uppercase text-white w-full'>
								<span className='ml-2.5'>{ locale === Language.UK ? 'Перейти до кошика' : 'Перейти в корзину' }</span>
							</Button> :
							<Button onPress={ onSubmit } className='uppercase w-full'>
								<span className='ml-2.5'>{ t('buy') }</span>
							</Button>
						}
					</div>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
};

export default PairedModal;
