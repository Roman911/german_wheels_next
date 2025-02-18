import { FC } from 'react';
import TopLine from './TopLine';
import HeaderMain from './HeaderMain';
import { SettingsProps } from '@/models/settings';
import { Language } from '@/models/language';

interface Props {
	locale: Language
	settings: SettingsProps
}

const Header: FC<Props> = ({ locale, settings }) => {
	return (
		<div className='header text-white'>
			<TopLine locale={ locale } settings={ settings } />
			<HeaderMain locale={ locale } />
		</div>
	)
};

export default Header;