import { FC } from 'react';
import Image from 'next/image';
import { Language } from '@/models/language';

interface Props {
	locale: string;
}

const Banner: FC<Props> = ({ locale }) => {
	return (
		<div className='relative mt-24'>
			<Image
				className=''
				src='/images/banner.jpg'
				alt=""
				width={ 1504 }
				height={ 600 }
			/>
			<div className='absolute top-1/2 -translate-y-1/2 text-4xl md:text-7xl font-bold uppercase text-white text-center w-full'>
				<div>{ locale === Language.UA ? 'Шини та диски' : 'Шины и диски' }</div>
				<div className='text-teal-300'>{ locale === Language.UA ? 'тільки з топовою' : 'только с топовой' }</div>
				<div>{ locale === Language.UA ? 'репутацією.' : 'репутацией.' }</div>
			</div>
		</div>
	)
};

export default Banner;