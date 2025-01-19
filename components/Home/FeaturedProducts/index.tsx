'use client'
import { FC } from 'react';
import { baseDataAPI } from '@/services/baseDataService';
import Title from '@/components/Lib/Title';
import Spinner from '@/components/Lib/Spinner';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/Lib/NoResult';
import { Language } from '@/models/language';

interface Props {
	locale: string
}

const FeaturedProducts: FC<Props> = ({ locale }) => {
	const { data: dataSetting } = baseDataAPI.useFetchSettingsQuery('');
	const {
		data,
		isLoading
	} = baseDataAPI.useFetchProductsQuery({ id: '?vehicle_type=1&order[value]=popular&order[asc]=0' });
	const lang = locale === 'ua' ? 'ua' : 'ru';

	return (
		<>
			{ dataSetting && <Title title={ dataSetting[lang].h2_top || '' }/> }
			<Spinner height='h-40' show={ isLoading } size='large'>
				{ data?.result ? <ProductList
					locale={ locale }
					classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5'
					data={ data?.data }
				/> : <NoResult
					noResultText={
						locale === Language.UA ?
							'На жаль, по заданих параметрах товарів не знайдено' : 'К сожалению, по заданным параметрам товаров не найдено'
					}/> }
			</Spinner>
		</>
	)
};

export default FeaturedProducts;
