import { Dispatch, FC, SetStateAction } from 'react';
import { Autocomplete, AutocompleteItem } from '@heroui/react';
import { useTranslations } from 'next-intl';
import type { Options } from '@/models/baseData';

interface SelectProps {
	name: string
	label: string
	isDisabled?: boolean
	setState?: Dispatch<SetStateAction<string | undefined>>
	options: Options[] | undefined
	onChange: (name: string, value: number | string | null, label?: number | string | null) => void
	defaultValue?: Options | undefined
}

const MySelect: FC<SelectProps> = (
	{
		name,
		label,
		options = [],
		isDisabled = false,
		onChange,
	}) => {
	const t = useTranslations('Select');

	const handleChange = (key: number | string | null) => {
		onChange(name, key, key);
	}

	return <Autocomplete
		className='max-w-full md:max-w-xs'
		classNames={ {
			listboxWrapper: 'rounded-xs'
		} }
		label={ label }
		isDisabled={ isDisabled }
		onSelectionChange={ handleChange }
		radius='none'
		listboxProps={ {
			emptyContent: t('no options message'),
		} }
	>
		{ options.map((item) => (
			<AutocompleteItem key={ item.value }>{ item.label }</AutocompleteItem>
		)) }
	</Autocomplete>
};

export default MySelect;
