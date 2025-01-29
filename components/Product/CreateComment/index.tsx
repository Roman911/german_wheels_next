'use client'
import { FC, useState } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import * as yup from 'yup';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import { baseDataAPI } from '@/services/baseDataService';
import { TextFile } from '@/components/Lib/TextFile';
import Rating from '@/components/Lib/Rating';

const schema = yup.object().shape({
	text: yup.string().required('Поле не може бути пустим'),
	name: yup.string().required('Поле не може бути пустим'),
	score: yup.number(),
});

interface FormProps {
	text: string
	name: string
	score?: number
}

const defaultValues = {
	text: '',
	name: '',
	score: 0,
}

interface CreateCommentProps {
	model_id?: number
	product_id?: number
	trc_id?: number
}

const CreateComment: FC<CreateCommentProps> = ({ model_id, product_id, trc_id }) => {
	const [ rate, setRate ] = useState<number>(0);
	const [ createComment ] = baseDataAPI.useCreateCommentMutation();
	const t = useTranslations('CreateComment');
	// const { control, formState: { errors } } = useFormContext();

	const { control, formState: { errors }, handleSubmit, reset } = useForm<FormProps>({
		mode: 'all',
		defaultValues,
		resolver: yupResolver(schema),
	})

	const onSubmit: SubmitHandler<FormProps> = async(data) => {
		const { text, name } = data;

		await createComment({
			text,
			name,
			score: rate,
			model_id,
			product_id,
			trc_id,
		}).then(data => {
			if(data) {
				reset();
			}
		})
	}

	return <form onSubmit={ handleSubmit(onSubmit) }>
			<div className='bg-white  shadow-md mt-6'>
				<h6 className='font-bold text-lg py-4 px-6 bg-blue-100'>
					{ t('leave review') }
				</h6>
				<div className='pt-4 px-6 pb-6'>
					<Controller
						name="name"
						control={ control }
						render={
						({ field }) => {
							return (
								<TextFile field={ field } label={ t('name') + '*' }
													error={ typeof errors?.['name']?.message === 'string' ? errors['name'].message : null }/>
							)
						}}/>
					<Controller
						name="text"
						control={ control }
						render={
						({ field }) => {
							return (
								<TextFile field={ field }
													label={ t('comment') + '*' }
													error={ typeof errors?.['text']?.message === 'string' ? errors['text'].message : null }
													isTextarea={ true }/>
							)
						}}/>
					<div className='mt-3 mb-6 flex items-center'>
				<span className='mr-2 ml-2 text-sm font-semibold'>
					{ t('rating') }
				</span>
						<Rating commentsAvgRate={ rate } size='medium' isCreateComment={ true } setRate={ setRate }/>
					</div>
					<button type="submit" className='btn primary'>
						{ t('add comment') }
					</button>
				</div>
			</div>
		</form>
};

export default CreateComment;
