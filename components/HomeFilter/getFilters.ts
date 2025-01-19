import { Section } from '@/models/section';
import { BaseDataProps, Options } from '@/models/baseData';

interface Props {
	section: Section
	data: BaseDataProps | undefined
}

interface FilterConfigs {
	label: string
	name: string
	focusValue: string
	options: Options[] | undefined
}

export const getFilters = ({ section, data }: Props) => {
	const filterConfigs: FilterConfigs[] = [];

	if(section === Section.Tires) {
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

		// filterConfigs.push({
		// 	label: 'brand',
		// 	name: 'brand',
		// 	options: data?.brand?.map(item => ({ value: item.value, label: item.label }))
		// });
		//
		// filterConfigs.push({
		// 	label: 'country',
		// 	name: 'country',
		// 	options: data?.[lang === Language.UA ? 'country' : 'country_ru']?.map(item => ({ value: item.value, label: item.label }))
		// });
		//
		// filterConfigs.push({
		// 	label: 'year',
		// 	name: 'year',
		// 	options: data?.tyre_year?.map(item => ({ value: item.value, label: item.label }))
		// });
	}

	return filterConfigs;
};
