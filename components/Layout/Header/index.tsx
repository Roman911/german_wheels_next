import { FC } from 'react';
import TopLine from './TopLine';
import HeaderMain from './HeaderMain';
import { SettingsProps } from '@/models/settings';

interface Props {
	settings: SettingsProps
}

const Header: FC<Props> = ({ settings }) => {
	return (
		<div className='header text-white'>
			<TopLine settings={ settings } />
			<HeaderMain />
		</div>
	)
};

export default Header;