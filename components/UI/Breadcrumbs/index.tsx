'use client';
import { FC } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { BreadcrumbItem, Breadcrumbs } from '@heroui/breadcrumbs';
import * as Icons from '@/components/Lib/Icons';

interface Props {
	path: {
		href: string
		title: string
		translations?: boolean
	}[]
}

const MyBreadcrumbs: FC<Props> = ({ path }) => {
	const t = useTranslations('Main');

	console.log('render')

	return (
		<Breadcrumbs separator='/' className='text-gray-400 hover:text-teal-600'>
			<BreadcrumbItem>
				<Link href='/'>
					<Icons.HomeIcon className='w-4 h-4 fill-gray-400'/>
				</Link>
			</BreadcrumbItem>
			{ path.map((item, index) => {
				return (
					<BreadcrumbItem key={ index + 1 } className={ twMerge(index === path.length - 1 ? 'text-black font-bold' : 'underline') }>
						<Link href={ item.href }>
							{ item.translations ? t(item.title) : item.title }
						</Link>
					</BreadcrumbItem>
				)
			}) }
		</Breadcrumbs>
	)
};

export default MyBreadcrumbs;
