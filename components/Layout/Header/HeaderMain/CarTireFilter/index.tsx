import { FC } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import TypeCarLinks from '../../../../TypeCarLinks';
import LinkComponent from '../LinkComponent';
import Title from '../Title';
import { Language } from '@/models/language';
import { brandsLinks, diameterLinks, seasonLinks } from './links';

interface Props {
	locale: Language
	closeFilter: () => void
}

export const CarTireFilter: FC<Props> = ({ locale, closeFilter }) => {
	const t = useTranslations('HeaderFilter');

	return <>
		<div>
			<Title title={ t('by season') }/>
			{ seasonLinks.map(item => {
				return <LinkComponent
					key={ item.label }
					href={ `/${ locale }/${ item.href }` }
					img={ item.img }
					label={ t(item.label) }
					mt={ item.mt }
					border={ false }
					onClick={ closeFilter }
				/>
			}) }
		</div>
		<div>
			<Title title={ t('by car type') }/>
			<TypeCarLinks locale={ locale } setOpen={ closeFilter } section='header' />
		</div>
		<div className='mt-6 lg:mt-0'>
			<Title title={ t('by brands') }/>
			<div className='mt-6 mb-6 grid grid-cols-2 gap-y-4 gap-x-2'>
				{ brandsLinks.map(item => {
					return <LinkComponent
						key={ item.label }
						href={ `/${ locale }/${ item.href }` }
						label={ item.label }
						border={ false }
						onClick={ closeFilter }
					/>
				}) }
			</div>
			<Link
				href={ `/${ locale }/catalog/tires` }
				onClick={ closeFilter }
				className='text-teal-300 font-bold hover:underline'
			>
				{ t('all brands') }
			</Link>
		</div>
		<div className='mt-6 lg:mt-0'>
			<Title title={ t('by diameter') }/>
			<div className='mt-6 mb-6 grid grid-cols-3 md:grid-cols-4 gap-1.5 max-w-64 pr-2.5'>
				{ diameterLinks.map(item => {
					return <LinkComponent
						key={ item.label }
						href={ `/${ locale }/${ item.href }` }
						border={ item.border }
						label={ item.label }
						onClick={ closeFilter }
					/>
				}) }
			</div>
		</div>
	</>
};
