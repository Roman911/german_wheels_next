'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import CardTireService from './CardTireService';
import { Locations } from '@/models/tireService';
import { useAppSelector } from '@/hooks/redux';
import Service from '@/components/TireService/Service';
import Time from '@/components/TireService/Time';
import Confirm from '@/components/TireService/Confirm';

const TireServiceLayout = ({ locations }: { locations: Locations }) => {
	const { location, selectedKey } = useAppSelector((state) => state.tireServiceReducer);
	const t = useTranslations('TireService');

	if(selectedKey === 'service') return <Service />;

	if(selectedKey === 'time') return <Time />;

	if(selectedKey === 'confirm') return <Confirm location={ locations.find(item => item.id === location) } />;

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
