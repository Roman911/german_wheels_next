'use client'
import Head from 'next/head';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { baseDataAPI } from '@/services/baseDataService';
import { useAppSelector } from '@/hooks/redux';
import Layout from '@/components/Layout';
import { Breadcrumbs } from '@/components/UI';
import Title from '@/components/Lib/Title';
import Spinner from '@/components/Lib/Spinner';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/Lib/NoResult';
import { Pagination } from '@heroui/react';
import { Language } from '@/models/language';

const itemsProduct = 12;

export default function Search() {
	const t = useTranslations('Search');
	const [ paginateCount, setPaginateCount ] = useState(0);
	const { search } = useAppSelector(state => state.searchReducer);
	const { data, isLoading } = baseDataAPI.useFetchProductsQuery({
		id: `?name=${ search }`,
		length: itemsProduct,
		start: paginateCount * itemsProduct
	});

	const path = [
		{
			title: t('search'),
			href: '/'
		}
	]

	const onchange = (page: number) => {
		setPaginateCount(page)
	}

	return <Layout>
		<Head>
			<title>{ t('search') }</title>
		</Head>
		<Breadcrumbs path={ path }/>
		<Title title={ t('search') } />
		<Spinner height='h-40' show={ isLoading }>
			{ data?.result ?
				<ProductList
					locale={ Language.UA }
					classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
					data={ data.data }
				/> :
				<NoResult noResultText='no result'/>
			}
		</Spinner>
		{ data?.result && data.data.total_count > itemsProduct && <div className='mt-10 flex justify-center'>
			<Pagination
				size='lg'
				initialPage={ paginateCount + 1 }
				total={ Math.floor(data?.data.total_count / itemsProduct) }
				variant='bordered'
				onChange={ onchange }
				classNames={ { cursor: 'text-black' } }
			/>
		</div> }
	</Layout>
};
