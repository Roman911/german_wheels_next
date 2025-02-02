'use client'
import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import * as Icons from '@/components/Lib/Icons';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/UI';
import Spinner from '@/components/Lib/Spinner';
import { baseDataAPI } from '@/services/baseDataService';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import AddAskModalComponent from '@/components/Product/ActionsBlock/AddAskModal/AddAskModalComponent';

const schema = yup.object().shape({
	ask: yup.string().min(10).required('Це поле обовʼязкове.'),
	email: yup.string().email().required('Це поле обовʼязкове.'),
});

interface FormProps {
	ask: string
	email: string
}

const defaultValues = {
	ask: '',
	email: '',
}

interface Props {
	id: number | undefined
	productName: string
}

const AddAskModal: FC<Props> = ({ id, productName }) => {
	const t = useTranslations('CallbackModal');
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [ loading, setLoading ] = useState(false);
	const [ isSending, setSending ] = useState(false);
	const [createAddAsk] = baseDataAPI.useCreateAddAskMutation();

	const methods = useForm<FormProps>({
		mode: 'all',
		defaultValues,
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<FormProps> = async ({ ask, email }) => {
		setLoading(true);
		await createAddAsk({
			ask,
			email,
			product_id: id,
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
				<Icons.MailIcon className='w-4 h-4 stroke-black group-hover:stroke-black'/>
			</button>
			<Modal isOpen={ isOpen } onOpenChange={ onOpenChange }>
				<ModalContent>
					{ () => (
						<>
							<FormProvider { ...methods }>
								<form onSubmit={ methods.handleSubmit(onSubmit) }>
									<ModalHeader className="flex items-center gap-2">
										<h3 className="text-base font-semibold leading-6 text-gray-900 uppercase" id="modal-title">
											{ t('ask') }
										</h3>
									</ModalHeader>
									<ModalBody>
										<p className="text-sm mt-4 text-gray-500">
											{ productName }
										</p>
										<AddAskModalComponent isSending={ isSending } />
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

export default AddAskModal;
