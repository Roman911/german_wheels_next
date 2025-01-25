import { FC, Fragment } from 'react';
import Link from 'next/link';
import { Brand, BrandsObject, BrandsObjectItems } from '@/models/brends';
import { Section } from '@/models/filter';
import { Language } from '@/models/language';

interface Props {
	locale: Language
	section: string
	brands: BrandsObject | BrandsObjectItems
}

const BrandsList: FC<Props> = ({ locale, brands, section }) => {
	return Object.entries(brands).map(([letter, brands], index) => {
		return <Fragment key={ index }>
			<div className='text-lg font-bold mb-1'>{ letter }</div>
			{ brands.map((brand: Brand, i: number) => {
				if(section === Section.Car) {
					return <Link
						key={ i }
						// onClick={ () => handleClick(brand.id) }
						className='block text-base hover:text-blue-300 hover:underline'
						href={ `/${locale}/catalog/tires` }
					>
						{ brand.name }
					</Link>
				}

				return <Link
					key={ i }
					className='block text-base hover:text-blue-300 hover:underline'
					href={ `/${locale}/catalog-map/${section}/${brand.manufacturer_id}` }
				>
					{ brand.name }
				</Link>
			}) }
		</Fragment>
	})
};

export default BrandsList;