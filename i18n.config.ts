import { Language } from './models/language';

const i18nConfig = {
	locales: [Language.UK, Language.RU],
	defaultLocale: Language.UK,
	localeDetection: false,
	domains: [
		{
			domain: 'http://shop.g-wheels.com.ua',
			defaultLocale: Language.UK,
		},
	]
};

export default i18nConfig;
