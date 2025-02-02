import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Controller, useFormContext } from 'react-hook-form';
import { TextFile } from '@/components/Lib/TextFile';

interface Props {
	isSending: boolean
}

const AddAskModalComponent: FC<Props> = ({ isSending }) => {
	const t = useTranslations('CallbackModal');
	const { control, formState: { errors } } = useFormContext();

	return (
		<>
			{ isSending ? <div className="mt-3">
				<p className="font-semibold text-gray-500">
					{ t('ask send') }
				</p>
			</div> : <div className="mt-3">
				<div className="relative mt-6 w-full min-w-[200px]">
					<Controller
						name="email"
						control={ control }
						render={ ({ field }) => {
							return <TextFile
								field={ field }
								label={ t('email') }
								error={ typeof errors?.['email']?.message === 'string' ? errors['email'].message : null }
							/>
						} }
					/>
					<Controller
						name="ask"
						control={ control }
						render={ ({ field }) => <TextFile
							field={ field }
							label={ t('your comment') }
							error={ typeof errors?.['ask']?.message === 'string' ? errors['ask'].message : null }
							isTextarea={ true }
						/> }
					/>
				</div>
			</div> }
		</>
	)
};

export default AddAskModalComponent;