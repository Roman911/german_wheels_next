'use client'
import { FC } from 'react';
import { usePathname, useParams } from 'next/navigation';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import Summary from './Summary';
import { Language } from '@/models/language';
import type { ProductsProps } from '@/models/products';
import type { OrdersParamProps } from '@/models/ordersParam';
import { TextFile } from '@/components/Lib/TextFile';
import { PhoneMaskInput } from '@/components/Lib/PhoneMaskInput';
import { NpCitySearch } from '@/components/Lib/NpCitySearch';
import { NpWarehousesSearch } from '@/components/Lib/NpWarehousesSearch';
import MySelect from '@/components/Lib/Select';

interface OrderProps {
	data: ProductsProps | undefined
	isLoading: boolean
	loadingBtn: boolean
	showNpWarehouses: boolean | undefined
	shippingMethod: string | number | null
	cartItems: { id: number; quantity: number }[]
	onChange: (name: string, value: number | string | null) => void
	dataOrdersParam: OrdersParamProps | undefined
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
	}) => {
	const { control, formState: { errors } } = useFormContext();
	const pathname = usePathname();
	const { locale } = useParams<{ locale: Language }>();
	const t = useTranslations('Select');
	const lang = pathname.split('/')[1] === 'ua' ? 'ua' : 'ru';

	const deliverysOptions = dataOrdersParam?.Deliverys.map(item => {
		return { value: item.deliverys_id, label: locale === Language.UK ? item.name : item.name_ru }
	});

	const paymentsOptions = dataOrdersParam?.Payments.map(item => {
		return { value: item.payments_id, label: locale === Language.UK ? item.name : item.name_ru }
	});

	return <div className='flex flex-col lg:flex-row gap-6'>
		<div className='flex-1'>
			<div className='bg-white pt-5 pb-8 px-6'>
				<h3 className='font-bold text-xl'>
					{ locale === Language.UK ? 'Контактні дані' : 'Контактные данные' }
				</h3>
				<input
					type={ 'text' }
					placeholder=' '
				/>
				<Controller
					name="firstname"
					control={ control }
					render={ ({ field }) => {
						return <TextFile field={ field } label={ locale === Language.UK ? 'Ім\'я' : 'Имя' }
														 error={ typeof errors?.['firstname']?.message === 'string' ? errors['firstname'].message : null }/>
					} }
				/>
				<Controller
					name="lastname"
					control={ control }
					render={ ({ field }) => {
						return <TextFile field={ field } label={ locale === Language.UK ? 'Прізвище' : 'Фамилия' }
														 error={ typeof errors?.['lastname']?.message === 'string' ? errors['lastname'].message : null }/>
					} }
				/>
				<Controller
					name="surname"
					control={ control }
					render={ ({ field }) => {
						return <TextFile field={ field } label={ locale === Language.UK ? 'По батькові' : 'Отчество' }
														 error={ typeof errors?.['surname']?.message === 'string' ? errors['surname'].message : null }/>
					} }
				/>
				<PhoneMaskInput/>
				<Controller
					name="email"
					control={ control }
					render={ ({ field }) => {
						return <TextFile field={ field } label={ locale === Language.UK ? 'Електронна пошта' : 'Электронная почта' }
														 error={ typeof errors?.['email']?.message === 'string' ? errors['email'].message : null }/>
					} }
				/>
			</div>
			<div className='bg-white pt-5 pb-8 px-6 mt-4'>
				<h3 className='font-bold text-xl'>{ locale === Language.UK ? 'Доставка та оплата' : 'Доставка и оплата' }</h3>
				<div className="relative mt-6 w-full min-w-[200px]">
					<h4 className='font-semibold'>
						{ locale === Language.UK ? 'Виберіть спосіб доставки' : 'Выберите способ доставки' }
					</h4>
					<div className='mt-3'>
						<MySelect name='shipping_method' label={ locale === Language.UK ? 'Спосіб доставки' : 'Способ доставки' }
											options={ deliverysOptions } onChange={ onChange }/>
					</div>
					{ (shippingMethod === '2' || shippingMethod === '3') && <div className='mt-3'>
						<NpCitySearch title={ t('city') }/>
					</div> }
					{ shippingMethod === '2' && showNpWarehouses && <div className='mt-3'>
						<NpWarehousesSearch title={ t('department') } locale={ locale } />
					</div> }
					{ shippingMethod === '3' && <Controller
						name="address"
						control={ control }
						render={ ({ field }) => {
							return <TextFile field={ field }
															 label={ locale === Language.UK ? 'Адреса (Вулиця, будинок)' : 'Адрес (Улица, дом)' }
															 error={ typeof errors?.['address']?.message === 'string' ? errors['address'].message : null }/>
						} }
					/> }
					<h4 className='font-semibold mt-6'>
						{ locale === Language.UK ? 'Виберіть спосіб оплати' : 'Выберите способ оплаты' }
					</h4>
					<MySelect name='payment_method' label='Способ оплаты' options={ paymentsOptions } onChange={ onChange }/>
				</div>
			</div>
			<div className='bg-white pt-5 pb-8 px-6 mt-4 md:mb-20'>
				<h4 className='font-semibold'>
					{ locale === Language.UK ? 'Додати коментар' : 'Додати коментар' }
				</h4>
				<Controller
					name="comment"
					control={ control }
					render={ ({ field }) => <TextFile field={ field }
																						label={ locale === Language.UK ? 'Ваш коментар' : 'Ваш комментарий' }
																						error={ typeof errors?.['text']?.message === 'string' ? errors['text'].message : null }
																						isTextarea={ true }/> }
				/>
			</div>
		</div>
		<Summary data={ data } isLoading={ isLoading } cartItems={ cartItems } loadingBtn={ loadingBtn } lang={ lang } />
	</div>
};

export default OrderComponent;
