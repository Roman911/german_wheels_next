import { FC } from 'react';
import ProductCard from './ProductCard';
import type { Data } from '@/models/products';

interface Props {
	locale: string
	classnames?: string
	data: Data
}

const ProductList: FC<Props> = ({ locale, classnames, data }) => {
	const products = data.products.map(item => {
		return <ProductCard key={ item.group } locale={ locale } item={ item } />
	})

	return (
		<div className={`grid gap-1.5 ${classnames}`}>
			{ products }
		</div>
	)
};

export default ProductList;
