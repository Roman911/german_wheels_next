'use client'
import { Dispatch, FC, SetStateAction } from 'react';
import { usePathname } from 'next/navigation';
import Link, { LinkProps } from 'next/link';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { useAppDispatch } from '@/hooks/redux';
import { setParams, resetFilter } from '@/store/slices/filterSlice';
import { BusIcon, CargoIcon, CarIcon, MotorcyclesIcon, SpecialEquipmentIcon, SuvIcon } from '../Lib/Icons';
import { typeCatLinks } from './links';
import { Language } from '@/models/language';

interface TypeCarLinksProps {
	locale: Language
	section: 'header' | 'catalog'
	setOpen?: Dispatch<SetStateAction<boolean>>
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
	label: string
	section: 'header' | 'catalog'
	icon: keyof typeof Icons
	iconStyles?: string
	iconStylesActive?: string
	vehicleType: string[]
	onClick?: () => void
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
	const pathname = usePathname();
	const value = pathname.split("vt-")[1]?.split("/")[0] || null;
	const active = value && vehicleType.includes(value);
	const IconComponent = Icons[icon];
	const dispatch = useAppDispatch();

	const handleClick = () => {
		if(onClick) onClick();
		dispatch(resetFilter());
		dispatch(setParams({ 'vehicle_type': null }));
	}

	return <Link
		href={ href }
		onClick={ handleClick }
		className={ twMerge('flex items-center group',
			section === 'catalog' && 'flex-col', section === 'header' && 'mt-3 gap-2.5'
		) }
	>
		<IconComponent className={
			twMerge(
				'transition group-hover:fill-teal-400 fill-gray-500',
				!active && iconStyles,
				active && iconStylesActive,
				active && 'fill-teal-400',
				active && value === '2' && 'stroke-teal-400',
			)
		}/>
		<span className={
			twMerge(
				'transition group-hover:text-teal-400',
				section === 'catalog' && 'text-sm font-bold text-gray-500',
				section === 'header' && 'group-hover:underline md:text-white',
				active && 'text-teal-400',
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
				href={ `/${locale}${item.href}`}
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
