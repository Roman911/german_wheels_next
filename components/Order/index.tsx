'use client'
import { FC } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Input, Textarea } from '@heroui/react';
import Summary from './Summary';
import { Language } from '@/models/language';
import PhoneMaskInput from '@/components/Lib/NewPhoneMaskInput';
import { NpCitySearch } from '@/components/Lib/NpCitySearch';
import { NpWarehousesSearch } from '@/components/Lib/NpWarehousesSearch';
import MySelect from '@/components/Lib/Select';
import type { ProductsProps } from '@/models/products';
import type { OrdersParamProps } from '@/models/ordersParam';

interface OrderProps {
	data: ProductsProps | undefined
	isLoading: boolean
	loadingBtn: boolean
	showNpWarehouses: boolean | undefined
	shippingMethod: string | number | null
	cartItems: { id: number; quantity: number }[]
	onChange: (name: string, value: number | string | null) => void
	dataOrdersParam: OrdersParamProps | undefined
	phoneErrorMessage: string | null
}

const OrderComponent: FC<OrderProps> = (
	{
		data,
		isLoading,
		cartItems,
		onChange,
		loadingBtn,
		shippingMethod,
		dataOrdersParam,
		showNpWarehouses,
		phoneErrorMessage
	}) => {
	const locale = useLocale();
	const t = useTranslations('Order');

	const deliverysOptions = dataOrdersParam?.Deliverys.map(item => {
		return { value: item.deliverys_id, label: locale === Language.UK ? item.name : item.name_ru }
	});

	const paymentsOptions = dataOrdersParam?.Payments.map(item => {
		return { value: item.payments_id, label: locale === Language.UK ? item.name : item.name_ru }
	});

	return <div className='flex flex-col lg:flex-row gap-6 w-full'>
		<div className='flex-1'>
			<div className='bg-white pt-5 pb-8 px-6 flex flex-col gap-4 dark:bg-[#333333]'>
				<h3 className='font-bold text-xl mb-4'>
					{ t('contact details') }
				</h3>
				<Input
					isRequired
					errorMessage={ t('error text') }
					label={ t('firstname') }
					name='firstname'
					type='text'
					variant='bordered'
				/>
				<Input
					isRequired
					errorMessage={ t('error text') }
					label={ t('lastname') }
					name='lastname'
					type='text'
					variant='bordered'
				/>
				<Input
					label={ t('surname') }
					name='surname'
					type='text'
					variant='bordered'
				/>
				<PhoneMaskInput phoneErrorMessage={ phoneErrorMessage } />
				<Input
					errorMessage={ t('enter valid email') }
					label={ t('email') }
					name='email'
					type='email'
					variant='bordered'
				/>
			</div>
			<div className='bg-white pt-5 pb-8 px-6 mt-4 dark:bg-[#333333]'>
				<h3 className='font-bold text-xl'>{ t('delivery and payment') }</h3>
				<div className='relative mt-6 w-full min-w-[200px] flex flex-col gap-3'>
					<h4 className='font-semibold'>
						{ t('choose a delivery method') }
					</h4>
					<MySelect name='shipping_method' label={ t('delivery method') } options={ deliverysOptions } onChange={ onChange }/>
					{ (shippingMethod === '2' || shippingMethod === '3' || shippingMethod === '4') && <NpCitySearch/> }
					{ shippingMethod === '2' && showNpWarehouses && <NpWarehousesSearch/> }
					{ shippingMethod === '3' && <Input
						label={ t('address') }
						name='address'
						type='text'
					/> }
					<h4 className='font-semibold mt-6'>
						{ t('choose a payment method') }
					</h4>
					<MySelect name='payment_method' label='Способ оплаты' options={ paymentsOptions } onChange={ onChange }/>
				</div>
			</div>
			<div className='bg-white pt-5 pb-8 px-6 mt-4 lg:mb-20 dark:bg-[#333333]'>
				<h4 className='font-semibold'>
					{ t('add comment') }
				</h4>
				<Textarea
					name='comment'
					label={ t('your comment') }
					variant='bordered'
				/>
			</div>
		</div>
		<Summary data={ data } isLoading={ isLoading } cartItems={ cartItems } loadingBtn={ loadingBtn }/>
	</div>
};

export default OrderComponent;
