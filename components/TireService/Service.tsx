import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Alert, Button, Switch } from "@heroui/react";
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { CarIcon, SuvIcon } from "@/components/Lib/Icons";
import {
	setDiameter,
	setTypeCar,
	setTyreSource,
	setSeasonChange,
	setWheelBalancing
} from '@/store/slices/tireService';
import ControlButtons from '@/components/TireService/ControlButtons';

const diameters = ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
const tyreSources = ['with_customer', 'storage', 'new_internet'];

const Service = () => {
	const dispatch = useAppDispatch();
	const { diameter, typeCar, tyreSource, seasonChange, wheelBalancing } = useAppSelector((state) => state.tireServiceReducer);
	const t = useTranslations('TireService');

	// Reusable styles
	const baseButton =
		'text-gray-500 hover:text-teal-600 hover:border-teal-600 hover:shadow-lg shadow-teal-600/20';
	const activeButton = 'text-teal-600 border-teal-600 shadow-lg shadow-teal-600/20';

	return (
		<>
			<div className='flex gap-4 mt-6 mb-6'>
				<Button
					variant='bordered'
					isIconOnly
					aria-label="Car"
					color='default'
					size='lg'
					radius='lg'
					onPress={ () => dispatch(setTypeCar('car')) }
					className={ twMerge('w-16 h-16', baseButton, typeCar === 'car' && activeButton) }
				>
					<CarIcon width={ 44 } height={ 44 } />
				</Button>
				<Button
					variant='bordered'
					isIconOnly
					aria-label="Suv"
					color='default'
					size='lg'
					radius='lg'
					onPress={ () => dispatch(setTypeCar('suv')) }
					className={ twMerge('w-16 h-16', baseButton, typeCar === 'suv' && activeButton) }
				>
					<SuvIcon width={ 44 } height={ 44 } />
				</Button>
			</div>
			<div className='flex flex-wrap gap-4 mt-6 mb-6'>
				{ diameters.map(item => {
					return (
						<Button
							key={ item }
							variant='bordered'
							color='default'
							radius='lg'
							size='lg'
							onPress={ () => dispatch(setDiameter(item)) }
							className={ twMerge(baseButton, diameter === item && activeButton) }
						>
							R{ item }
						</Button>
					)
				}) }
			</div>
			<div className='flex flex-wrap gap-4 mt-6 mb-6'>
				{ tyreSources.map(item => {
					return (
						<Button
							key={ item }
							variant='bordered'
							color='default'
							radius='lg'
							size='lg'
							onPress={ () => dispatch(setTyreSource(item)) }
							className={ twMerge(baseButton, tyreSource === item && activeButton) }
						>
							{ t(item) }
						</Button>
					)
				})}
			</div>
			{ tyreSource === 'storage' && <Alert color='danger' title={ t('attention') } /> }
			<h3 className='text-xl font-bold mt-6 mb-6'>
				{ t('services') }
			</h3>
			<div className='flex flex-col gap-4 mt-6 mb-6'>
				<Switch
					isSelected={ seasonChange }
					onChange={ () => dispatch(setSeasonChange(!seasonChange)) }
				>{ t('seasonal tire replacement') }</Switch>
				<Switch
					isSelected={ wheelBalancing }
					onChange={ () => dispatch(setWheelBalancing(!wheelBalancing)) }
				>{ t('wheel balancing') }</Switch>
			</div>
			<ControlButtons prev='location' next='time' />
		</>
	)
};

export default Service;
