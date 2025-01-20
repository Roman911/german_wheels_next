import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Banner = () => {
	const t = useTranslations('Banner');

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
				<div>{ t('tires and disks') }</div>
				<div className='text-teal-300'>{ t('only with top') }</div>
				<div>{ t('reputation') }.</div>
			</div>
		</div>
	)
};

export default Banner;
