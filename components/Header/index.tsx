import { FC } from 'react';
import TopLine from './TopLine';
import HeaderMain from './HeaderMain';

interface Props {
	locale: string;
}

const Header: FC<Props> = ({ locale }) => {
	return (
		<header className='header text-white'>
			<TopLine locale={ locale } />
			<HeaderMain locale={ locale } />
		</header>
	)
};

export default Header;