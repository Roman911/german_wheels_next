'use client'
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, } from "@heroui/react";
import { Button } from '@/components/UI';
import Spinner from '@/components/Lib/Spinner';
import { Language } from '@/models/language';
import { useTranslations } from 'next-intl';
import { Section } from '@/models/filter';
import { Offers } from '@/models/product';
import { baseDataAPI } from '@/services/baseDataService';
import { PhoneMaskInput } from '@/components/Lib/PhoneMaskInput';

const schema = yup.object().shape({
	telephone: yup.string().min(13).max(13).required('Це поле обовʼязкове.'),
});

interface FormProps {
	telephone: string
}

const defaultValues = {
	telephone: '',
}

interface Props {
	locale: Language
	offerId: number
	quantity: number
	section: Section
	offerItem: Offers | undefined
}

const QuickOrder: FC<Props> = (
	{
		locale,
		offerId,
		quantity,
		offerItem,
	}
) => {
	const router = useRouter();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [ loading, setLoading ] = useState(false);
	const [ createOrder ] = baseDataAPI.useCreateOrderMutation();
	const t = useTranslations('QuickOrder');

	const methods = useForm<FormProps>({
		mode: 'all',
		defaultValues,
		resolver: yupResolver(schema),
	})

	const onSubmitQuickOrder: SubmitHandler<FormProps> = async({ telephone }) => {
		setLoading(true);
		const product = {
			product_id: offerItem?.product_id,
			offer_id: offerId,
			price: Number(offerItem?.price),
			quantity,
		};

		await createOrder({
			fast: 1,
			firstname: '',
			lastname: '',
			surname: '',
			email: '',
			telephone,
			total: Number(offerItem?.price) * quantity,
			comment: 'null',
			payment_method: 1,
			shipping_method: 1,
			payment_address_1: 'null',
			payment_address_2: 'null',
			payment_city: '',
			ref_wirehouse: '',
			ref_city: '',
			products: [ product ],
		}).then((response: {
			data?: { result: boolean, linkpay: string, order_id: number };
			error?: FetchBaseQueryError | SerializedError
		}) => {
			const data = response?.data;
			if(data) {
				if(data?.linkpay?.length > 0) {
					window.open(data?.linkpay, "_blank")
				}
				if(data?.result) {
					methods.reset();
					router.push(`/${ locale }/order/successful`)
				}
			} else if(response.error) {
				console.error('An error occurred:', response.error);
			}
		}).finally(() => {
			setLoading(false);
		});
	}

	return (
		<>
			<Button
				onPress={ onOpen }
				className='bg-white mt-2.5 w-full md:w-72 hover:bg-white hover:shadow uppercase'
			>
				{ t('quick order') }
			</Button>
			<Modal isOpen={ isOpen } onOpenChange={ onOpenChange }>
				<ModalContent>
					{ () => (
						<>
							<FormProvider { ...methods }>
								<form onSubmit={ methods.handleSubmit(onSubmitQuickOrder) }>
									<ModalHeader className="flex items-center gap-2">
										<Image width={ 18 } height={ 18 } src='/images/nova-poshta-logo-white-bg.png' alt=""/>
										<h3 className="text-base font-semibold leading-6 text-gray-900">
											{ locale === Language.UA ? 'Розрахунок доставки' : 'Расчет доставки' }
										</h3>
									</ModalHeader>
									<ModalBody>
										<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
											<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
												<h3 className="text-base font-semibold leading-6 text-gray-900"
														id="modal-title">{ locale === Language.UA ? 'ШВИДКЕ ЗАМОВЛЕННЯ' : 'БЫСТРЫЙ ЗАКАЗ' }</h3>
												<div className="mt-3">
													<p className="text-sm text-gray-500">
														{ locale === Language.UA ?
															'Економте Ваш час, просто залиште телефон і менеджер з Вами зв\'яжеться для уточнення всіх деталей' :
															'Экономьте Ваше время, просто оставьте телефон и менеджер с Вами свяжется для уточнения всех деталей' }
													</p>
													<div className="relative mt-6 h-11 w-full min-w-[200px]">
														<PhoneMaskInput />
													</div>
												</div>
											</div>
										</div>
									</ModalBody>
									<ModalFooter>
										<Button type="submit" className='btn primary w-max px-5 uppercase' disabled={ loading }>
											<Spinner size='small' height='h-10' show={ loading }>
												{ locale === Language.UA ? 'Надіслати' : 'Отправить' }
											</Spinner>
										</Button>
									</ModalFooter>
								</form>
							</FormProvider>
						</>
					) }
				</ModalContent>
			</Modal>
		</>
	)
};

export default QuickOrder;
