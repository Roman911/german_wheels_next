import { FC, ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import { useParams } from 'next/navigation';

interface Props extends LinkProps {
	children: ReactNode
	className?: string
}

const MyLink: FC<Props> = ({ href, children, ...rest }) => {
	const { locale } = useParams();

	return (
		<Link href={`/${locale}${href}`} {...rest}>
			{children}
		</Link>
	);
};

export default MyLink;