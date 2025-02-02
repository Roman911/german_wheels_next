import Link from 'next/link';
import { useTranslations } from 'next-intl';
import * as Icons from '../../Lib/Icons';
import { Language } from '@/models/language';
import Contacts from '@/components/Layout/Header/TopLine/Contacts';
import { SettingsProps } from '@/models/settings';

const InfoBlock = ({ locale, settings }: { locale: Language, settings: SettingsProps }) => {
	const t = useTranslations('');

	return <div className='lg:w-80'>
		<div className=' bg-white rounded px-5 py-7'>
			<Contacts isInfo={ true } settings={ settings }/>
			<div className='flex items-center gap-x-2.5 mt-2'>
				<Icons.EmailIcon className='fill-black'/>
				<a href={ `mailto:${ settings.ua.config_email }` } className='ml-1 font-bold'>
					{ settings.ua.config_email }
				</a>
			</div>
			<div className='mt-5 text-sm pb-4 border-b border-[#D8D8D9] leading-9 whitespace-pre-wrap'>
				{ settings[locale].config_address }
			</div>
			<Link href={ `/${ locale }/page/shipment` }
						className='mt-4 flex items-center gap-x-2.5 font-medium text-black hover:text-teal-600 hover:underline'>
				<Icons.DeliveryIcon className='fill-[#868D9A]'/>
				<span className='group-hover:underline'>Доставка</span>
			</Link>
			<Link href={ `/${ locale }/page/payment` }
						className='mt-4 flex items-center gap-x-2.5 font-medium text-black hover:text-teal-600 hover:underline'>
				<Icons.PaymentIcon className='fill-[#868D9A]'/>
				<span className='group-hover:underline'>Оплата</span>
			</Link>
			<Link href={ `/${ locale }/page/garantiya-ta-povernennya` }
						className='mt-4 flex items-center gap-x-2.5 font-medium text-black hover:text-teal-600 hover:underline'>
				<Icons.GuaranteeIcon className='fill-[#868D9A]'/>
				<span className='group-hover:underline'>{ t('warranty and returns') }</span>
			</Link>
		</div>
	</div>
};

export default InfoBlock;
