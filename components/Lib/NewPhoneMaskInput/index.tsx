'use client'
import { PatternFormat } from 'react-number-format';
import { useTranslations } from 'next-intl';
import { Input } from '@heroui/input';
import { setPhone } from '@/store/slices/phoneSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

const PhoneMaskInput = ({ phoneErrorMessage }: { phoneErrorMessage: null | string }) => {
	const dispatch = useAppDispatch();
	const { phone } = useAppSelector(state => state.phoneReducer);
	const t = useTranslations('PhoneMask');

	const handleChangeAmount = (values: { value: string }) => {
		setPhone(values.value);
		dispatch(setPhone(values.value));
	};

	return (
		<PatternFormat
			label={ t('phone number') }
			isRequired
			variant="bordered"
			isInvalid={!!phoneErrorMessage && phone?.length !== 10}
			errorMessage={ phoneErrorMessage && t(phoneErrorMessage) }
			format="+38 (###)###-##-##" allowEmptyFormatting mask='_'
			value={ phone }
			onValueChange={ handleChangeAmount }
			customInput={ Input }
			aria-label="input-monto"
			name='phone'
		/>
	)
};

export default PhoneMaskInput;
