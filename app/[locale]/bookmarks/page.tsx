'use client'
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
	const noDataText = 'ua' === Language.UA ? 'Ви ще не додали в обране жодного товару' : 'Вы еще не добавили в избранное ни одного товара';
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const { products, isLoading} = useAppGetProducts(bookmarksItems, 'reducerBookmarks');

	const path = [
		{
			title: 'favorites',
			href: '/'
		}
	]

	return <Layout>
		<Breadcrumbs path={path}/>
		<Title title='favorites'/>
		{bookmarksItems.length > 0 ? <Spinner height='h-40' show={ isLoading } >
			<ProductList
				locale={ Language.UA }
				classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
				data={{ products, total_count: products.length }}
			/>
		</Spinner> : <NoResult noResultText={ noDataText } />}
	</Layout>
};
