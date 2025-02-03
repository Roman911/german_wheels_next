import createMiddleware from 'next-intl/middleware';
import { Language } from '@/models/language';

export default createMiddleware({
	locales: ['ua', 'ru'],
	defaultLocale: 'ua',
	domains: [
		{
			domain: 'http://shop.g-wheels.com.ua',
			defaultLocale: Language.UA,
		},
	]
});

export const config = {
	matcher: ["/", "/(ru|ua)/:path*"]
};
