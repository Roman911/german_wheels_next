import { FC } from 'react';
import Contacts from './Contacts';
import LanguageChanger from './LanguageChanger';

interface Props {
	locale: string;
}

const TopLine: FC<Props> = ({ locale }) => {
	return (
		<section className='top-line w-full bg-black border-b border-natural-600'>
			<div className='container mx-auto flex justify-between py-2 px-4'>
				<Contacts />
				<LanguageChanger locale={ locale } />
			</div>
		</section>
	)
};

export default TopLine;
