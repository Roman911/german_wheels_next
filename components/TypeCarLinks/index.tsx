'use client'
import { Dispatch, FC, SetStateAction } from 'react';
import { usePathname } from 'next/navigation';
import { LinkProps } from 'next/link';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Link } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { resetFilter, setParams } from '@/store/slices/filterSlice';
import { BusIcon, CargoIcon, CarIcon, MotorcyclesIcon, SpecialEquipmentIcon, SuvIcon } from '../Lib/Icons';
import { typeCatLinks } from './links';

interface TypeCarLinksProps {
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
		className={
			twMerge(
				'flex items-center transition hover:text-teal-400',
				section === 'catalog' && 'flex-col text-sm font-bold text-gray-500',
				section === 'header' && 'mt-3 gap-2.5 hover:underline md:text-white',
				active && 'text-teal-400',
			) }
	>
		<IconComponent />
		<span>
			{ label }
		</span>
	</Link>
}

const TypeCarLinks: FC<TypeCarLinksProps> = ({ setOpen, section }) => {
	const t = useTranslations('CarType');

	const handleClick = () => {
		if(setOpen) setOpen(false);
	}

	return <>
		{ typeCatLinks.map(item => {
			return <LinkComponent
				key={ item.label }
				section={ section }
				href={ item.href }
				icon={ item.icon as keyof typeof Icons }
				label={ t(item.label) }
				onClick={ handleClick }
				vehicleType={ item.vehicleType }
			/>
		}) }
	</>
};

export default TypeCarLinks;
