'use client';
import { FC, useState } from 'react';
import { useDisclosure } from '@heroui/react';
import ProductCardPaired from './CardPaired';
import type { DataPaired } from '@/models/products';
import PairedModal from '@/components/ProductList/PairedModal';

interface Props {
	locale: string
	data: DataPaired
}

const ProductListPaired: FC<Props> = ({ locale, data }) => {
	const [ group, setGroup ] = useState(0);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const products = data.products.map(item => {
		return <ProductCardPaired key={ item.brand } locale={ locale } item={ item } onOpen={ onOpen } setGroup={ setGroup } />
	})

	return (
		<div className='flex flex-col gap-4'>
			{ products }
			{ isOpen && <PairedModal idProduct={ group } locale={ locale } isOpen={ isOpen } onOpenChange={ onOpenChange } /> }
		</div>
	)
};

export default ProductListPaired;
