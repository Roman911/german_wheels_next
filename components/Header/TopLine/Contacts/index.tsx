'use client'
import { FC } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { baseDataAPI } from '@/services/baseDataService';
import type { PhoneLogo } from '@/models/config';

import kievstarLogo from '@/public/icons/kievstar-logo.svg';
import lifecellLogo from '@/public/icons/life-logo.svg';

const phoneLogos: Record<PhoneLogo, string> = {
	kievstar: kievstarLogo,
	lifecell: lifecellLogo,
};

interface Props {
	isInfo?: boolean
}

const Contacts: FC<Props> = ({ isInfo }) => {
	const { data, isLoading } = baseDataAPI.useFetchSettingsQuery('');

	const telephones: {
		phone: string | undefined
		url: string | undefined
		logo: PhoneLogo | undefined
	}[] = [
		{ phone: data?.ua.config_telephone_kievstar, url: data?.ua.config_telephone_kievstar_url, logo: 'kievstar' },
		{ phone: data?.ua.config_telephone_life, url: data?.ua.config_telephone_life_url, logo: 'lifecell' },
	];

	if(isLoading) return null;

	return (
		<div className={
			twMerge('py-1 flex items-center', isInfo && 'text-black flex-col items-start gap-2')
		}>
			{ telephones.map((item, index) => {
				return <div
					key={ index }
					className={ twMerge('flex items-center my-0.5 text-sm font-semibold', !isInfo && 'mr-1.5 md:mr-5') }
				>
					{ item.logo && <Image
						src={ phoneLogos[item.logo] }
						alt={ item.logo }
						width={ 20 }
						height={ 20 }
						priority
					/> }
					<a href={ `tel:${ item.url }` } className='ml-1 md:ml-2.5'>
						{ item.phone }
					</a>
				</div>
			}) }
		</div>
	)
};

export default Contacts;
