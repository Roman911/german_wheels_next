'use client'
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Autocomplete, AutocompleteItem } from '@heroui/react';
import type { Options } from '@/models/baseData';

interface SelectProps {
	name: string
	label: string
	isDisabled?: boolean
	focusValue?: string
	options: Options[] | undefined
	onChange: (name: string, value: number | string | null) => void
}

const MySelect: FC<SelectProps> = ({ name, label, options = [], isDisabled = false, onChange }) => {
	const t = useTranslations('Select');

	const onSelectionChange = (key: number | string | null) => {
		onChange(name, key);
	};

	return <Autocomplete
		className='max-w-full md:max-w-xs'
		classNames={{
			listboxWrapper: 'rounded-xs'
		}}
		label={ label }
		isDisabled={ isDisabled }
		onSelectionChange={onSelectionChange}
		radius='none'
		listboxProps={{
			emptyContent: t('no options message'),
		}}
	>
		{ options.map((item) => (
			<AutocompleteItem key={ item.value }>{ item.label }</AutocompleteItem>
		)) }
	</Autocomplete>
};

export default MySelect;
