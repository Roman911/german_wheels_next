'use client'
import { useTranslations } from 'next-intl';
import { useAppSelector } from '@/hooks/redux';
import { useAppGetProducts } from '@/hooks/getProducts';
import ProductList from '@/components/ProductList';
import Layout from '@/components/Layout';
import NoResult from '@/components/Lib/NoResult';
import Spinner from '@/components/Lib/Spinner';
import Title from '@/components/Lib/Title';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import { Language } from '@/models/language';

export default function Bookmarks() {
	const t = useTranslations('Favorites');
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const { products, isLoading } = useAppGetProducts(bookmarksItems, 'reducerBookmarks');

	const path = [
		{
			title: t('favorites'),
			href: '/'
		}
	];

	return <Layout>
		<Breadcrumbs path={ path }/>
		<Title title={ t('favorites') }/>
		{ bookmarksItems.length > 0 ? <Spinner height='h-40' show={ isLoading }>
			<ProductList
				locale={ Language.UA }
				classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
				data={ { products, total_count: products.length } }
			/>
		</Spinner> : <NoResult noResultText='any products to favorites yet' /> }
	</Layout>
};
