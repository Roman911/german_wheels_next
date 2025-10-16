import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setChange, setDate } from '@/store/slices/tireService';
import { parseDate } from '@internationalized/date';
import TimeItems from '@/components/TireService/TimeItems';
import { DatePicker, Input, Textarea } from '@heroui/react';
import PhoneMaskInput from '@/components/Lib/NewPhoneMaskInput';
import ControlButtons from '@/components/TireService/ControlButtons';

const Time = () => {
	const dispatch = useAppDispatch();
	const { location, date, form } = useAppSelector((state) => state.tireServiceReducer);
	const t = useTranslations('TireService');

	const onChange = (name: 'name' | 'email' | 'auto' | 'model' | 'num' | 'comment', value: string) => {
		dispatch(setChange({ name, value }));
	}

	return (
		<>
			<DatePicker
				isRequired
				className="max-w-xs"
				label={ t('tire fitting date') }
				labelPlacement="outside"
				value={ date ? parseDate(date) : null }
				onChange={ (value) => {
					if(value) {
						const isoDate = `${ value.year }-${ String(value.month).padStart(2, '0') }-${ String(value.day).padStart(2, '0') }`;
						dispatch(setDate(isoDate));
					} else {
						dispatch(setDate(null));
					}
				} }
			/>
			<div className='mt-8 mb-6'>
				{ date ? <TimeItems location={ location } date={ date }/> :
					<h3 className='font-bold text-lg'>{ t('choose a tire fitting date') }</h3> }
			</div>
			<div className='grid grid-cols-3 gap-4'>
				<Input
					isRequired
					label={ t('name') }
					name='name'
					type='text'
					variant='bordered'
					value={form.name}
					onChange={ (e) => onChange('name', e.target.value) }
				/>
				<PhoneMaskInput phoneErrorMessage=''/>
				<Input
					label='Email'
					name='email'
					type='email'
					variant='bordered'
					value={form.email}
					onChange={ (e) => onChange('email', e.target.value) }
				/>
				<Input
					label={ t('auto') }
					name='auto'
					type='text'
					variant='bordered'
					value={form.auto}
					onChange={ (e) => onChange('auto', e.target.value) }
				/>
				<Input
					label={ t('model') }
					name='model'
					type='text'
					variant='bordered'
					value={form.model}
					onChange={ (e) => onChange('model', e.target.value) }
				/>
				<Input
					label={ t('num') }
					name='num'
					type='text'
					variant='bordered'
					value={form.num}
					onChange={ (e) => onChange('num', e.target.value) }
				/>
				<Textarea
					name='comment'
					variant='bordered'
					label={ t('comment') }
					className='col-span-3'
					value={form.comment}
					onChange={ (e) => onChange('comment', e.target.value) }
				/>
			</div>
			<ControlButtons prev='service' next='confirm'/>
		</>
	)
};

export default Time;
