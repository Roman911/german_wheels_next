import { Language } from './models/language';

const i18nConfig = {
	locales: [Language.UA, Language.RU],
	defaultLocale: Language.UA,
	localeDetection: false,
	domains: [
		{
			domain: 'http://shop.g-wheels.com.ua',
			defaultLocale: Language.UA,
		},
	]
};

export default i18nConfig;
