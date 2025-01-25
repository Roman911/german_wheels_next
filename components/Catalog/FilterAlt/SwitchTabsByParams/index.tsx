import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Button } from '@/components/UI';
import { Subsection } from '@/models/filter';

const subsection: Subsection = Subsection.ByParams;

const tabs = [
	{ title: 'by parameters', section: Subsection.ByParams },
	{ title: 'by car', section: Subsection.ByCars }
];

const SwitchTabsByParams = () => {
	const t = useTranslations('Catalog');

	return (
		<div className='flex lg:justify-between gap-x-5'>
			{ tabs.map((item, index) => (
				<Button
					key={index}
					variant='light'
					className={ twMerge(
						'font-bold uppercase lg:normal-case text-gray-500 p-0 hover:bg-transparent hover:text-black',
						subsection === item.section && 'text-black')
				}>
					{ t(item.title) }
				</Button>
			)) }
		</div>
	)
};

export default SwitchTabsByParams;
