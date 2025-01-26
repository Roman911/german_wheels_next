import { Section } from '@/models/section';
import { BaseDataProps, Options } from '@/models/baseData';
import { Language } from '@/models/language';

const typeOptions = [
	{
		// label: 'light',
		label: 'Легкові',
		label_ru: 'Легковые',
		value: '1',
	},
	{
		// label: 'suvs',
		label: 'Позашляховики',
		label_ru: 'Внедорожники',
		value: '2',
	},
	{
		// label: 'buses',
		label: 'Буси',
		label_ru: 'Бусы',
		value: '8',
	},
	{
		// label: 'cargo',
		label: 'Вантажні',
		label_ru: 'Грузовые',
		value: '3',
	},
	{
		// label: 'special equipment',
		label: 'Спецтехніка',
		label_ru: 'Спецтехника',
		value: '9',
	},
	{
		// label: 'motorcycles',
		label: 'Мотоцикли',
		label_ru: 'Мотоциклы',
		value: '7',
	},
];

const customTireSeason = [
	{ value: '1', name: 'Летние', name_ua: 'Літні'},
	{ value: '3', name: 'Всесезонные', name_ua: 'Всесезонні'},
	{ value: '2', name: 'Зимние', name_ua: 'Зимові'},
];

interface Props {
	locale: Language
	section: Section
	data: BaseDataProps | undefined
}

interface FilterConfigs {
	label: string
	name: string
	focusValue: string
	options: Options[] | undefined
}

export const getFilters = ({ locale, section, data }: Props) => {
	const filterConfigs: FilterConfigs[] = [];

	if(section === Section.Tires) {
		filterConfigs.push({
			label: 'type',
			name: 'type',
			focusValue: '',
			options: typeOptions.map(item => ({ value: item.value, label: locale === Language.UA ? item.label : item.label_ru }))
		});

		filterConfigs.push({
			label: 'width',
			name: 'width',
			focusValue: '175',
			options: data?.tyre_width?.map(item => ({ value: item.value, label: item.value, p: item.p }))
		});
		filterConfigs.push({
			label: 'height',
			name: 'height',
			focusValue: '45',
			options: data?.tyre_height?.map(item => ({ value: item.value, label: item.value, p: item.p }))
		});

		filterConfigs.push({
			label: 'diameter',
			name: 'radius',
			focusValue: `R${14}`,
			options: data?.tyre_diameter?.map(item => ({ value: item.value, label: `R${item.value}`, p: item.p }))
		});

		filterConfigs.push({
			label: 'season',
			name: 'sezon',
			focusValue: '',
			options: customTireSeason.map(item => ({ value: item.value, label: locale === Language.UA ? item.name_ua : item.name }))
		});

		filterConfigs.push({
			label: 'year',
			name: 'year',
			focusValue: '',
			options: data?.tyre_year?.map(item => ({ value: item.value, label: item.label }))
		});

		filterConfigs.push({
			label: 'brand',
			name: 'brand',
			focusValue: '',
			options: data?.brand?.map(item => ({ value: item.value, label: item.label }))
		});
	}

	return filterConfigs;
};
