import { FC, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic'
import { GroupBase, SelectInstance, SingleValue, StylesConfig } from 'react-select';
import type { Options } from '@/models/baseData';

const DynamicSelect = dynamic(() => import('react-select'), {
	loading: () => null,
	ssr: false
})

interface SelectProps {
	name: string
	label: string
	isDisabled?: boolean
	focusValue?: string
	options: Options[] | undefined
	onChange: (name: string, value: number | string | undefined) => void
}

type IsMulti = false;

const colourStyles: StylesConfig<Options | undefined, IsMulti> = {
	control: (styles) => ({
		...styles,
		padding: '5px 4px 5px 16px',
		borderColor: 'transparent',
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		':hover': {
			borderColor: '#8CC9FF',
			boxShadow: '0 0 0 1px #8CC9FF',
		},

	}),
	input: (styles) => ({
		...styles,
		fontSize: 18,
		fontWeight: 500,
		color: '#181818',
	}),
	singleValue: (styles) => ({
		...styles,
		fontSize: 18,
		fontWeight: 500,
		color: '#181818',
	}),
	placeholder: (styles, { isDisabled}) => ({
		...styles,
		fontSize: 18,
		fontWeight: 500,
		color: isDisabled ? '#18181899' : '#181818',
	}),
	indicatorSeparator: (styles) => ({
		...styles,
		display: 'none'
	}),
	dropdownIndicator: (styles, { isDisabled}) => ({
		...styles,
		color: isDisabled ? '#18181899' : '#181818',
		':hover': {
			color: '#181818',
		},
	}),
	clearIndicator: (styles) => ({
		...styles,
		color: '#181818',
		':hover': {
			color: '#181818',
		},
	}),
	menuList: (provided) => {
		return {
			...provided,
			'::-webkit-scrollbar': {
				width: '10px',
				borderRadius: '6px',
				backgroundColor: '#E4E4E5',
			},
			'::-webkit-scrollbar-thumb': {
				backgroundColor: '#ABAFB2',
				border: '2px solid #E4E4E5',
				borderRadius: '6px',
			}
		};
	},
};

const MySelect: FC<SelectProps> = ({ name, label, options = [], focusValue, isDisabled = false, onChange }) => {
	const ref = useRef<SelectInstance<Options, IsMulti, GroupBase<Options>> | null>(null);

	const onMenuOpen = useCallback( () => {
		if (focusValue) {
			setTimeout(() => {
				const selectedEl = ref.current?.menuListRef;
				const cont = selectedEl?.querySelectorAll('.MyDropdown__option') || [];

				// Find the index of the element with the matching textContent
				const elIndex = Array.from(cont).findIndex(el => el.textContent === focusValue);

				if (elIndex !== -1) {
					// Scroll to the found option
					selectedEl?.scroll(0, elIndex * 40);
				}
			}, 15);  // Adjusted delay
		}
	}, [focusValue]);

	const handleChange = (value: SingleValue<Options | undefined>) => {
		onChange(name, value?.value);
	}

	return <DynamicSelect
		options={ options }
		ref={ ref as never }
		onMenuOpen={ onMenuOpen }
		styles={ colourStyles }
		placeholder={ label }
		isClearable={ true }
		isDisabled={ isDisabled }
		onChange={ handleChange }
		className='MyDropdown'
		classNamePrefix='MyDropdown'
		// noOptionsMessage={ () => lang === Language.UA ? 'Збігів не знайдено' : 'Совпадений не найдено' }
		noOptionsMessage={ () => 'Збігів не знайдено' }
	/>
};

export default MySelect;
