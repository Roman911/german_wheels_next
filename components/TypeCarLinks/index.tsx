import { Dispatch, FC, SetStateAction } from 'react';
import Link, { LinkProps } from 'next/link';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';

import { BusIcon, CargoIcon, CarIcon, MotorcyclesIcon, SpecialEquipmentIcon, SuvIcon } from '../Lib/Icons';

import { typeCatLinks } from './links';

interface TypeCarLinksProps {
	locale: string
	section: 'header' | 'catalog'
	setOpen: Dispatch<SetStateAction<boolean>>
}

const Icons = {
	light: CarIcon,
	bus: BusIcon,
	cargo: CargoIcon,
	motorcycle: MotorcyclesIcon,
	special: SpecialEquipmentIcon,
	suv: SuvIcon,
};

interface ILinkComponent extends LinkProps {
	label: string;
	section: 'header' | 'catalog'
	icon: keyof typeof Icons
	iconStyles?: string
	iconStylesActive?: string
	vehicleType: string[]
}

const LinkComponent: FC<ILinkComponent> = (
	{
		section,
		href,
		icon,
		label,
		onClick,
		iconStyles,
		iconStylesActive,
		vehicleType
	}) => {
	// const params = useParams();
	// const value = params?.['*'] ? params['*'].split("vt-")[1]?.split("/")[0] || null : null;
	const value = undefined;
	const active = value && vehicleType.includes(value);
	const IconComponent = Icons[icon];

	return <Link
		href={ href }
		onClick={ onClick }
		className={ twMerge('flex items-center group',
			section === 'catalog' && 'flex-col', section === 'header' && 'mt-3 gap-2.5'
		) }
	>
		<IconComponent className={
			twMerge(
				'transition group-hover:fill-teal-300 fill-natural-500',
				!active && iconStyles,
				active && iconStylesActive,
				active && 'fill-teal-300 stroke-teal-300'
			)
		}/>
		<span className={
			twMerge(
				'transition group-hover:text-teal-300',
				active && 'text-teal-300',
				section === 'catalog' && 'text-sm font-bold text-natural-500',
				section === 'header' && 'group-hover:underline text-white'
			)
		}>
			{ label }
		</span>
	</Link>
}

const TypeCarLinks: FC<TypeCarLinksProps> = ({ locale, setOpen, section }) => {
	const t = useTranslations('CarType');

	const handleClick = () => {
		if(setOpen) setOpen(false);
	}

	return <>
		{ typeCatLinks.map(item => {
			return <LinkComponent
				key={ item.label }
				section={ section }
				href={ `/${locale}/${item.href}`}
				icon={ item.icon as keyof typeof Icons }
				label={ t(item.label) }
				onClick={ handleClick }
				iconStyles={ item.iconStyles }
				iconStylesActive={ item.iconStylesActive }
				vehicleType={ item.vehicleType }
			/>
		}) }
	</>
};

export default TypeCarLinks;
