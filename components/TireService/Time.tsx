import { DatePicker } from '@heroui/react';
import { useTranslations } from 'next-intl';

const Time = () => {
	const t = useTranslations('TireService');

	return (
		<div>
			<DatePicker
				className="max-w-xs"
				label={ t('tire fitting date') }
				labelPlacement="outside"
			/>
		</div>
	)
};

export default Time;
