import { FC } from 'react';
import Link from 'next/link';
import { Language } from '@/models/language';
import { BrandsObject, BrandsObjectItems } from '@/models/brends';

interface Props {
	locale: Language
	section: string
	data: BrandsObject | BrandsObjectItems
}

const ProductList: FC<Props> = ({ locale, section, data }) => {
	const sectionTransform = section === 'tyre' ? 'tires' : 'disks';

	return Array.isArray(data) ? data.map(item => {
		return <Link
			key={ item.model_id }
			href={ `/${locale}/catalog/${ sectionTransform }/b-${ item.manufacturer_id }/m-${ item.model_id }` }
			className='block text-base hover:text-blue-300 hover:underline'
		>
			{ item.name }
		</Link>
	}) : null
}

export default ProductList;
