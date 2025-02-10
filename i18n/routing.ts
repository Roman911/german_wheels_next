import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { Language } from '@/models/language';

export const routing = defineRouting({
	locales: [ Language.UK, Language.RU ],
	defaultLocale: Language.UK,
	pathnames: {
		'/': '/',
	}
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
	createNavigation(routing);