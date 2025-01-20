import { FC } from 'react';
import Contacts from './Contacts';
import LanguageChanger from './LanguageChanger';
import { SettingsProps } from '@/models/settings';

interface Props {
	locale: string
	settings: SettingsProps
}

const TopLine: FC<Props> = ({ locale, settings }) => {
	return (
		<section className='top-line w-full bg-black border-b border-natural-600'>
			<div className='container mx-auto flex justify-between py-2 px-4'>
				<Contacts settings={ settings } />
				<LanguageChanger locale={ locale } />
			</div>
		</section>
	)
};

export default TopLine;
