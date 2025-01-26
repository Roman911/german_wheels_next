'use client'
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslations } from 'next-intl';
import { baseDataAPI } from '@/services/baseDataService';
import Tab from './Tab';
import TiresFilter from './TiresFilter';
import { getFilters } from './getFilters';
import styles from './index.module.scss';
import { Section } from '@/models/section';
import { Language } from '@/models/language';

const Filter = ({ locale }: { locale: Language }) => {
	const [ section, setSection ] = useState(Section.Tires);
	const [ isOpen, setOpen ] = useState(false);
	const [ filter, setFilter ] = useState({});
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const t = useTranslations('Main');
	const filters = getFilters({ locale, section, data });

	console.log(filter);

	const onChange = (name: string, value: number | string | undefined) => {
		if(value) {
			setFilter(prev => ({ ...prev, [name]: value }));
		}
	}

	const handleClick = (value: Section) => {
		const newOpenState = !(section === value && isOpen);
		setSection(value);
		setOpen(newOpenState);
	};

	const submit = () => {
		console.log(submit);

		// const searchUrl = generateUrl(filter);
		// const rout = `/catalog/${section}/`;
		// const newRout = lang === Language.UA ? rout : `/ru${rout}`;
		// navigate(newRout + searchUrl);
	}

	const renderFilter = () => {
		switch(section) {
			// case Section.Disks:
			// 	return <DisksFilter filters={data} onChange={ onChange } onSubmit={ submit } />;
			// case Section.Car:
			// 	return <FilterByCar/>;
			default:
				return <TiresFilter filters={ filters } onChange={ onChange } onSubmit={ submit }/>;
		}
	};

	return <section className={ twMerge(styles['home-filter'], styles[`home-filter__${ section }`]) }>
		<div className="mx-auto py-6 px-5 md:px-8 lg:py-16 xl:py-24 2xl:px-28 max-w-screen-2xl w-full">
			<div className={ twMerge('mt-2 md:mt-11 mb-8 flex justify-center gap-x-2.5') }>
				<Tab name={ Section.Tires } section={ section } isOpen={ isOpen } handleClick={ handleClick }
						 label={ t('tires') }/>
				<Tab name={ Section.Disks } section={ section } isOpen={ isOpen } handleClick={ handleClick }
						 label={ t('disks') }/>
				<Tab name={ Section.Car } section={ section } isOpen={ isOpen } handleClick={ handleClick }
						 label={ t('selection by car') }/>
			</div>
			<div className="">{ renderFilter() }</div>
		</div>
	</section>
};

export default Filter;
