'use client';
import { FC } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import { Language } from '@/models/language';

const params = [
	{ title: 'UA', language: Language.UA },
	{ title: 'RU', language: Language.RU },
];

interface Props {
	locale: string;
}

const LanguageChanger: FC<Props> = ({ locale }) => {
	const pathname = usePathname();
	const path = pathname.replace(/^\/ru|^\/ua/, '');

	return (
		<div className='divide-x text-natural-500 divide-natural-500 font-semibold text-sm 2xl:text-base'>
			{ params.map((item, index) => {
				return <Link
					key={ index }
					href={ item.language === Language.UA ? `/ua${ path }` : `/ru${ path }` }
					className={
						twMerge(
							'leading-8 pr-1.5 2xl:pr-3 active:text-white',
							locale === item.language && 'text-white pointer-events-none',
							index === 0 && 'pr-1.5 2xl:pr-3',
							index === 1 && 'pl-1.5 2xl:px-3'
						)
					}>
					{ item.title }
				</Link>
			}) }
		</div>
	)
};

export default LanguageChanger;
