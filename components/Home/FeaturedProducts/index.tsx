'use client'
import { useTranslations } from 'next-intl';
import { baseDataAPI } from '@/services/baseDataService';
import { useLanguages } from '@/hooks/language';
import Title from '@/components/Lib/Title';
import Spinner from '@/components/Lib/Spinner';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/Lib/NoResult';

const FeaturedProducts = () => {
	const lang = useLanguages();
	const t = useTranslations('FeaturedProducts');
	const { data: dataSetting } = baseDataAPI.useFetchSettingsQuery('');
	const {
		data,
		isLoading
	} = baseDataAPI.useFetchProductsQuery({ id: '?vehicle_type=1&order[value]=popular&order[asc]=0' });
	
	return (
		<>
			{ dataSetting && <Title title={ dataSetting[lang].h2_top || '' }/> }
			{ data?.result ? <ProductList
				classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5'
				data={ data?.data }
			/> : <NoResult noResultText={ t('no result') }/> }
		</>
	)
};

export default FeaturedProducts;
