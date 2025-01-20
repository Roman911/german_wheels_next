'use client'
import { usePathname } from 'next/navigation';
import { Language } from '@/models/language';

export const useLanguages = () => {
	const pathname = usePathname();

	return /ua/.test(pathname) ? Language.UA : Language.RU;
};
