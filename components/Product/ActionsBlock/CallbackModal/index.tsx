'use client'
import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import * as Icons from '@/components/Lib/Icons';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { PhoneMaskInput } from '@/components/Lib/PhoneMaskInput';
import { Button } from '@/components/UI';
import Spinner from '@/components/Lib/Spinner';
import { baseDataAPI } from '@/services/baseDataService';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

const schema = yup.object().shape({
	telephone: yup.string().min(13, 'Це поле обовʼязкове.').max(13).required('Це поле обовʼязкове.'),
});

interface FormProps {
	telephone: string
}

const defaultValues = {
	telephone: '',
}

interface Props {
	id: number | undefined
	quantity: number
}

const CallbackModal: FC<Props> = ({ id, quantity }) => {
	const t = useTranslations('CallbackModal');
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [ loading, setLoading ] = useState(false);
	const [ isSending, setSending ] = useState(false);
	const [ createCallback ] = baseDataAPI.useCreateCallbackMutation();

	const methods = useForm<FormProps>({
		mode: 'all',
		defaultValues,
		resolver: yupResolver(schema),
	})

	const onSubmit: SubmitHandler<FormProps> = async({ telephone }) => {
		setLoading(true);
		await createCallback({
			phone: telephone,
			product_id: id?.toString(),
			quantity,
		}).then((response: { data?: { result: boolean }; error?: FetchBaseQueryError | SerializedError }) => {
			if(response?.data?.result) {
				methods.reset();
				setSending(true);
			} else if(response.error) {
				console.error('An error occurred:', response.error);
			}
		}).finally(() => {
			setLoading(false);
		});
	}

	return (
		<>
			<button onClick={ onOpen } className='p-3 bg-[#E4E9F2] hover:bg-teal-300 rounded-full group'>
				<Icons.PhoneCircuitIcon className='w-4 h-4 stroke-black group-hover:stroke-black'/>
			</button>
			<Modal isOpen={ isOpen } onOpenChange={ onOpenChange }>
				<ModalContent>
					{ () => (
						<>
							<FormProvider { ...methods }>
								<form onSubmit={ methods.handleSubmit(onSubmit) }>
									<ModalHeader className="flex items-center gap-2">
										<h3 className="text-base font-semibold leading-6 text-gray-900 uppercase" id="modal-title">
											{ t('callback') }
										</h3>
									</ModalHeader>
									<ModalBody>
										{ isSending ? <div className="mt-3">
											<p className="text-sm text-gray-500">
												{ t('our manager') }
											</p>
										</div> : <div className="mt-3">
											<p className="text-sm text-gray-500">
												{ t('put phone') }
											</p>
											<div className="relative mt-6 h-11 w-full min-w-[200px]">
												<PhoneMaskInput/>
											</div>
										</div> }
									</ModalBody>
									<ModalFooter>
										<Button type="submit" className='btn primary w-max px-5 uppercase' disabled={ loading }>
											<Spinner size='small' height='h-10' show={ loading }>
												{ t('send') }
											</Spinner>
										</Button>
									</ModalFooter>
								</form>
							</FormProvider>
						</>
					) }
				</ModalContent>
			</Modal>
		</>
	)
};

export default CallbackModal;
