import { FC } from 'react';
import Link from '@/components/Lib/Link';
import { BrandsObject, BrandsObjectItems } from '@/models/brends';

interface Props {
	section: string
	data: BrandsObject | BrandsObjectItems
}

const ProductList: FC<Props> = ({ section, data }) => {
	const sectionTransform = section === 'tyre' ? 'tires' : 'disks';

	return Array.isArray(data) ? data.map(item => {
		return <Link
			key={ item.model_id }
			href={ `/catalog/${ sectionTransform }/b-${ item.manufacturer_id }/m-${ item.model_id }` }
			className='block text-base hover:text-blue-300 hover:underline'
		>
			{ item.name }
		</Link>
	}) : null
}

export default ProductList;
