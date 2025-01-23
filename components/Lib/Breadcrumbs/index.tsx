import { FC } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { useTranslations } from 'next-intl';
import * as Icons from '../Icons';

interface BreadcrumbsItem {
	id: number
	title: string
	translations: boolean
	url: string | false | undefined
}

interface BreadcrumbsProps {
	path: BreadcrumbsItem[]
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ path }) => {
	const t = useTranslations('Main');

	return <nav className='breadcrumbs'>
		<ol className='flex overflow-auto max-w-full whitespace-nowrap'>
			<li className='text-sm'>
				<Link href="/"><Icons.HomeIcon className='w-4 h-4 fill-gray-400'/></Link>
			</li>
			{ path.map((item, index) => {
				if(!item.url) return null;

				return <li
					key={ item.id }
					className={
						twMerge(
							'text-sm before:content-["/"] pl-1.5 before:pr-1.5 text-gray-400',
							index === path.length - 1 && 'text-black font-bold',
							index !== path.length - 1 && 'hover:text-teal-600'
						)}>
					<Link
						className={ twMerge(index !== path.length - 1 && 'underline', index === path.length - 1 && 'pointer-events-none') }
						href={ item.url }
					>
						{ item.translations ? t(item.title) : item.title }
					</Link>
				</li>
			}) }
		</ol>
	</nav>
};

export default Breadcrumbs;
