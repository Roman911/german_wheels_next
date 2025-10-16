'use client'
import React from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/UI';
import { useAppDispatch } from '@/hooks/redux';
import { MarkerIcon, PhoneCircuitIcon } from '@/components/Lib/Icons';
import { Location } from '@/models/tireService';
import { Language, LanguageCode } from '@/models/language';
import { setSelectedKey, setLocation, reset } from '@/store/slices/tireService';

const CardTireService = ({ item }: { item: Location }) => {
	const dispatch = useAppDispatch();
	const locale = useLocale();
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;
	const descriptions = item && item.descriptions[lang];

	const handleClick = (id: number) => {
		dispatch(reset());
		dispatch(setLocation(id));
		dispatch(setSelectedKey('service'));
	}

	return (
		<div className='card w-full border-1 border-gray-400 rounded-sm py-4 px-4 md:px-6'>
			<div className="title font-bold text-lg mb-4">
				{ descriptions.name }
			</div>
			<div className='flex gap-4 justify-between items-end'>
				<div>
					<div className="flex gap-2 items-center mb-3">
						<MarkerIcon className='text-teal-600' />
						<p className='font-semibold'>{ descriptions.address }</p>
					</div>
					<div className="flex gap-2 items-center">
						<PhoneCircuitIcon className='text-teal-600' />
						<p className='font-semibold'>{ descriptions.phone }</p>
					</div>
				</div>
				<Button className='btn-primary' onPress={ () => handleClick(item.id)}>
					Он-лайн запис
				</Button>
			</div>
		</div>
	)
};

export default CardTireService;
