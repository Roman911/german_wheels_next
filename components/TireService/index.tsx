'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import CardTireService from './CardTireService';
import { Locations } from '@/models/tireService';
import { useAppSelector } from '@/hooks/redux';
import Service from '@/components/TireService/Service';
import Time from '@/components/TireService/Time';

const TireServiceLayout = ({ locations }: { locations: Locations }) => {
	const { selectedKey } = useAppSelector((state) => state.tireService);
	const t = useTranslations('TireService');

	if(selectedKey === 'service') return <Service />;

	if(selectedKey === 'time') return <Time />;

	return (
		<>
			<p className='font-bold text-xl'>{ t('for tire fitting appointments') }</p>
			<div className='flex flex-col md:flex-row items-center gap-4 mt-6'>
				{ locations.map(item => {
					return (
						<CardTireService
							key={ item.id }
							item={ item }
						/>
					)
				}) }
			</div>
		</>
	)
};

export default TireServiceLayout;
