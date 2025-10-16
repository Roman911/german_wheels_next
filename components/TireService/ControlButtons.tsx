import { Button } from '@heroui/react';
import { useAppDispatch } from '@/hooks/redux';
import { setSelectedKey } from '@/store/slices/tireService';
import { ArrowLeftLongIcon } from '@/components/Lib/Icons';
import { Button as MyButton } from '@/components/UI';
import { useTranslations } from 'next-intl';

const ControlButtons = ({ prev, next }: { prev: string, next: string }) => {
	const dispatch = useAppDispatch();
	const t = useTranslations('TireService');

	return (
		<div className='flex gap-4 mt-6 mb-6'>
			<Button
				variant='light'
				color='default'
				radius='lg'
				size='lg'
				onPress={ () => dispatch(setSelectedKey(prev)) }
				startContent={ <ArrowLeftLongIcon /> }
			>Назад</Button>
			<MyButton
				color='primary'
				onPress={ () => dispatch(setSelectedKey(next)) }
			>{ t('next step') }</MyButton>
		</div>
	)
};

export default ControlButtons;
