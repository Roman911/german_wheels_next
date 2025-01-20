import { FC } from 'react';
import ProductCard from './ProductCard';
import type { Data } from '@/models/products';

interface Props {
	classnames?: string
	data: Data | undefined
}

const ProductList: FC<Props> = ({ classnames, data }) => {
	const products = data?.products.map(item => {
		return <ProductCard key={ item.group } item={ item } />
	})

	return (
		<div className={`grid gap-1.5 ${classnames}`}>
			{ products }
		</div>
	)
};

export default ProductList;
