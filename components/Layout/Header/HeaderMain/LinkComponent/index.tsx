import { FC } from 'react';
import Image from 'next/image';
import Link, { LinkProps } from 'next/link';
import { twMerge } from 'tailwind-merge';

interface Props extends LinkProps {
	img?: string
	label: string
	mt?: string
	border: boolean
}

const LinkComponent: FC<Props> = ({ href, onClick, img, label, mt, border }) => {
	return <Link
		href={ href }
		onClick={ onClick }
		className={ twMerge('flex items-center gap-2.5 group', mt,
			border &&
			'w-12 lg:w-14 h-10 text-sm lg:text-base justify-center font-medium border border-gray-700 rounded-sm '
			+ 'transition md:bg-gray-700 hover:text-teal-300 hover:border-teal-300'
		)}
	>
		{ img && <Image
			src={ `/icons/${img}.svg` }
			alt={ `${img} logo` }
			width={ 24 }
			height={ 24 }
			priority
		/> }
		<span className={ twMerge(!border && 'transition group-hover:text-teal-300 group-hover:underline') }>
			{ label }
		</span>
	</Link>
};

export default LinkComponent;
