'use client'
import { FC, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, } from "@heroui/react";
import { useAppSelector } from '@/hooks/redux';
import { Button } from '@/components/UI';
import { Language } from '@/models/language';
import { NpCitySearch } from '@/components/Lib/NpCitySearch';
import Quantity from '@/components/Lib/Quantity';
import NpDocumentPrice from '@/components/Lib/NpDocumentPrice';

interface Props {
	locale: Language
	offer_id?: number
}

const DeliveryCalculation: FC<Props> = ({ locale, offer_id }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [ quantity, setQuantity ] = useState(1);
	const { city } = useAppSelector(state => state.orderReducer);
	const [ showDescription, setShowDescription ] = useState<boolean>(false);
	const t = useTranslations('Select');

	const onSetQuantity = (_: number, quan: number) => {
		setQuantity(quan);
	}

	const handleClick = () => {
		setShowDescription(true);
	}

	const onChange = (e: { target: HTMLInputElement }) => {
		const value = e.target.value;
		const onlyNumbers = value.replace(/\D/g, '');
		const numericValue = Number(onlyNumbers);

		setQuantity(numericValue < 99 ? numericValue : 99);
	}

	return (
		<>
			<Button
				onPress={ onOpen }
				className='delivery-calculation bg-white mt-6 text-sm font-medium border border-black w-full md:w-72 hover:bg-white hover:shadow'
			>
				<Image width={ 48 } height={ 32 } className='mr-2.5' src='/icons/truck.svg' alt=""/>
				{ t('delivery calculation') }
			</Button>
			<Modal isOpen={ isOpen } onOpenChange={ onOpenChange }>
				<ModalContent>
					{ (onClose) => (
						<>
							<ModalHeader className="flex items-center gap-2">
								<Image width={ 18 } height={ 18 } src='/images/nova-poshta-logo-white-bg.png' alt=""/>
								<h3 className="text-base font-semibold leading-6 text-gray-900">
									{ locale === Language.UA ? 'Розрахунок доставки' : 'Расчет доставки' }
								</h3>
							</ModalHeader>
							<ModalBody>
								<div className="mt-3 sm:ml-4 sm:mt-0 sm:text-left">
									<div className='mt-6 mb-4'>
										{ !showDescription && <>
											<p className='mt-4'>
												{ locale === Language.UA ? 'Вкажіть місто' : 'Укажите город' }
											</p>
											<NpCitySearch title={ t('city') }/>
											<p className='mt-4 mb-2'>
												{ locale === Language.UA ? 'Вкажіть кількість' : 'Укажите количество' }
											</p>
											<Quantity
												id={ 0 }
												quantity={ quantity }
												offerQuantity={ 99 }
												onChange={ onChange }
												setQuantity={ onSetQuantity }
											/>
										</> }
										{ showDescription && city.value.length > 0 && <NpDocumentPrice offer_id={ offer_id } quantity={ quantity } /> }
									</div>
								</div>
							</ModalBody>
							<ModalFooter>
								{ showDescription ? <Button onPress={ onClose } type="button" className='w-max px-5'>
									{ locale === Language.UA ? 'Закрити' : 'Закрыть' }
								</Button> : <Button onPress={ handleClick } type="button" className='btn primary w-max px-5'>
									{ locale === Language.UA ? 'Розрахувати' : 'Рассчитать' }
								</Button> }
							</ModalFooter>
						</>
					) }
				</ModalContent>
			</Modal>
		</>
	)
};

export default DeliveryCalculation;
