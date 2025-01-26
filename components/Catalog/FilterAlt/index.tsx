'use client'
import { FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setParams } from '@/store/slices/filterSlice';
import SwitchTabs from './SwitchTabs';
import SwitchTabsByParams from './SwitchTabsByParams';
import Select from './Select';
import { Section, Subsection } from '@/models/filter';
import type { BaseDataProps, Options } from '@/models/baseData';
import { SubmitFloat } from '@/components/Catalog/FilterAlt/SubmitFloat';
import { Language } from '@/models/language';
// import MySelect from '@/components/Home/HomeFilter/Select';
import { appointmentCargo, appointmentIndustrial, customTireSeason, others, typeDisc } from './customParamForSelector';
import { baseDataAPI } from '@/services/baseDataService';
// import { SelectFromTo } from '@/components/Catalog/FilterAlt/SelectFromTo';

const cargoTypes = ['3', '4', '5', '6'];
const industrialTypes = ['9', '10', '11'];

interface Props {
	locale: Language
	filterData: BaseDataProps | undefined
	section: Section
}

const FilterAlt: FC<Props> = ({ locale, filterData, section }) => {
	const t = useTranslations('Filters')
	const [ element, setElement ] = useState<HTMLElement | null>(null);
	const dispatch = useAppDispatch();
	const { filter, subsection } = useAppSelector(state => state.filterReducer);
	const appointmentCargoShow = filter.vehicle_type && cargoTypes.includes(filter.vehicle_type);
	const appointmentIndustrialShow = filter.vehicle_type && industrialTypes.includes(filter.vehicle_type);
	const { data } = baseDataAPI.useFetchBaseDataQuery('');

	const onChange = (name: string, value: number | string | undefined | null, element: HTMLElement) => {
		if(name === 'brand') {
			dispatch(setParams({ model_id: null }));
		}
		setElement(element);
		dispatch(setParams({ [name]: value }));
	}

	const renderSelect = (
		name: string,
		label: string,
		variant: 'white' | 'gray',
		options: Array<Options> = [],
		focusValue?: string | false,
		value?: null | number | string,
		search?: boolean,
		valueStudded?: null | number | string,
		filterOther?: {
			only_c: string | null | undefined
			only_xl: string | null | undefined
			only_owl: string | null | undefined
			only_run_flat: string | null | undefined
			only_off_road: string | null | undefined
		}
	) => (
		<div className='relative'>
			<Select
				name={ name }
				label={ label }
				focusValue={ focusValue }
				options={ options }
				variant={ variant }
				onChange={ onChange }
				filterValue={ value }
				search={ search }
				valueStudded={ valueStudded }
				filterOther={ filterOther }
			/>
		</div>
	);

	return (
		<div
			className={ twMerge('fixed lg:static top-0 left-0 right-0 bottom-0 bg-gray-800/60 lg:bg-transparent z-20 lg:block') }>
			<div
				className='filter h-screen lg:h-auto w-[calc(100%-70px)] lg:w-64 mr-6 pt-4 lg:pt-0 bg-white lg:bg-transparent'>
				<SwitchTabs locale={ locale } section={ section } />
			</div>
			<div
				className='relative h-[calc(100%-50px)] pb-32 lg:pb-4 px-4 pt-4 bg-white border border-gray-200 z-10 overflow-y-auto md:overflow-y-visible'>
				<SubmitFloat element={ element } btnTitle={ t('to apply') } setElement={ setElement } offset={ 300 }/>
				<SwitchTabsByParams/>
				{ subsection === Subsection.ByParams && <>
					{ section === Section.Tires && <>
						{ renderSelect(
							'width',
							'width',
							'gray',
							filterData?.tyre_width.map(item => ({ value: item.value, label: item.value, p: item.p })),
							'175',
							filter?.width,
							true,
						) }
						{ section === Section.Tires && renderSelect(
							'height',
							'height',
							'gray',
							filterData?.tyre_height?.map(item => ({ value: item.value, label: item.value, p: item.p })),
							'45',
							filter?.height,
							true,
						) }
						{ renderSelect(
							'radius',
							'diameter',
							'gray',
							filterData?.tyre_diameter?.map(item => ({ value: item.value, label: `R${ item.value }`, p: item.p })),
							'R14',
							filter?.radius,
							true,
						) }
					</> }
					{section === Section.Disks && <>
						{renderSelect(
							'width',
							'width',
							'gray',
							filterData?.disc_width?.map(item => ({value: item.value, label: item.value, p: item.p})),
							false,
							filter?.width,
							true,
						)}
						{renderSelect(
							'radius',
							'diameter',
							'gray',
							filterData?.disc_diameter?.map(item => ({value: item.value, label: `R${item.value}`, p: item.p})),
							false,
							filter?.radius,
							true,
						)}
					</>}
				</> }
				{/*{subsection === 'byCars' && <>*/}
				{/*	<div className='mt-2'>*/}
				{/*		{<MySelect*/}
				{/*			name='brand'*/}
				{/*			label={t('car brand')}*/}
				{/*			options={data?.auto?.map(item => ({value: item.value, label: item.label}))}*/}
				{/*			onChange={onChangeByCar}*/}
				{/*			defaultValue={filterCar?.brand ? data?.auto?.find(i => i.value === filterCar.brand) : undefined}*/}
				{/*		/>}*/}
				{/*	</div>*/}
				{/*	<div className='mt-2'>*/}
				{/*		<MySelect*/}
				{/*			name='model'*/}
				{/*			label={t('model', true)}*/}
				{/*			options={model?.map(item => ({value: item.value, label: item.label}))}*/}
				{/*			isDisabled={model?.length === 0}*/}
				{/*			onChange={onChangeByCar}*/}
				{/*			defaultValue={filterCar?.model ? model?.find(i => i.value === filterCar.model) : undefined}*/}
				{/*		/>*/}
				{/*	</div>*/}
				{/*	<div className='mt-2'>*/}
				{/*		<MySelect*/}
				{/*			name='year'*/}
				{/*			label={t('graduation year', true)}*/}
				{/*			options={modelYear?.map(item => ({value: item, label: item}))}*/}
				{/*			isDisabled={modelYear?.length === 0}*/}
				{/*			onChange={onChangeByCar}*/}
				{/*			defaultValue={filterCar?.year ? {value: filterCar?.year, label: filterCar?.year} : undefined}*/}
				{/*		/>*/}
				{/*	</div>*/}
				{/*	<div className='mt-2'>*/}
				{/*		<MySelect*/}
				{/*			name='modification'*/}
				{/*			label={t('modification', true)}*/}
				{/*			options={modelKit?.map(item => ({value: item.value, label: item.label}))}*/}
				{/*			isDisabled={modelKit?.length === 0}*/}
				{/*			onChange={onChangeByCar}*/}
				{/*			defaultValue={filterCar?.modification ? modelKit?.find(i => i.value === filterCar.modification) : undefined}*/}
				{/*		/>*/}
				{/*	</div>*/}
				{/*</>}*/}
				{section === Section.Tires && <>
					{!appointmentCargoShow && !appointmentIndustrialShow && renderSelect(
						'sezon',
						'season',
						'white',
						customTireSeason.map(item => ({value: item.value, label: locale === Language.UA ? item.name_ua : item.name})),
						false,
						filter?.sezon,
						false,
						filter?.only_studded
					)}
					{appointmentCargoShow && renderSelect(
						'vehicle_type',
						'appointment',
						'white',
						appointmentCargo.map(item => ({value: item.value, label: locale === Language.UA ? item.name_ua : item.name})),
						false,
						filter?.vehicle_type,
					)}
					{appointmentIndustrialShow && renderSelect(
						'vehicle_type',
						'appointment',
						'white',
						appointmentIndustrial.map(item => ({
							value: item.value,
							label: locale === Language.UA ? item.name_ua : item.name
						})),
						false,
						filter?.vehicle_type,
					)}
					{renderSelect(
						'brand',
						'brand',
						'white',
						data?.brand?.map(item => ({value: item.value, label: item.label})),
						false,
						filter?.brand && Number(filter.brand),
						true,
					)}
				</>}
				{section === Section.Disks && <>
					{renderSelect(
						'krepeg',
						'fasteners',
						'white',
						data?.krip?.map(item => ({value: item.value, label: item.value, p: item.p})),
						false,
						filter?.krepeg,
						true,
					)}
					{/*<SelectFromTo name='et' nameMin='etMin' nameMax='etMax' minus={true} from={-140} to={500}*/}
					{/*							title={`ET(${t('departure')})`} btnTitle={t('to apply')} closeFilter={ closeFilter } />*/}
					{/*<SelectFromTo name='dia' nameMin='diaMin' nameMax='diaMax' from={46} to={500} title='DIA'*/}
					{/*							btnTitle={t('to apply')} closeFilter={ closeFilter } />*/}
					{renderSelect(
						'typedisk',
						'type',
						'gray',
						typeDisc.map(item => ({value: item.value, label: locale === Language.UA ? item.name_ua : item.name})),
						false,
						filter?.typedisk,
					)}
					{renderSelect(
						'colir',
						'color',
						'white',
						data?.colir_abbr?.map(item => ({value: item.value, label: item.value, p: item.p})),
						false,
						filter?.colir,
						true,
					)}
					{renderSelect(
						'brand',
						'brand',
						'white',
						data?.brand_disc?.map(item => ({value: item.value, label: item.label})),
						false,
						filter?.brand && Number(filter.brand),
						true,
					)}
				</>}
				{section === Section.Tires && <>
					{renderSelect(
						'li',
						'load index',
						'white',
						data?.load.map(item => ({value: item.value, label: item.value})),
						false,
						filter?.li,
						true,
					)}
					{renderSelect(
						'si',
						'speed index',
						'white',
						data?.speed.map(item => ({value: item.value, label: item.value})),
						false,
						filter?.si,
						true,
					)}
					{renderSelect(
						'omolog',
						'homologation',
						'white',
						data?.omolog.map(item => ({value: item.value, label: item.value})),
						false,
						filter?.omolog,
						true,
					)}
					{renderSelect(
						'other',
						'other',
						'white',
						others.map(item => ({value: item.value, label: locale === Language.UA ? item.name_ua : item.name})),
						false,
						null,
						false,
						null,
						{
							only_c: filter?.only_c ?? null,
							only_xl: filter?.only_xl ?? null,
							only_owl: filter?.only_owl ?? null,
							only_run_flat: filter?.only_run_flat ?? null,
							only_off_road: filter?.only_off_road ?? null,
						}
					)}
				</>}
			</div>
		</div>
	)
};

export default FilterAlt;
