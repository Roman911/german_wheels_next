import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Alert } from "@heroui/react";
import { useAppSelector } from '@/hooks/redux';
import { Location } from '@/models/tireService';
import { Language, LanguageCode } from '@/models/language';
import { baseDataAPI } from '@/services/baseDataService';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Button } from '@/components/UI';

const Confirm = ({ location }: { location: Location | undefined }) => {
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState<null | string>(null);
	const router = useRouter();
	const params = useParams();
	const locale = useLocale();
	const t = useTranslations('TireService');
	const { date, diameter, typeCar, form, time, tyreSource, seasonChange, wheelBalancing } = useAppSelector((state) => state.tireServiceReducer);
	const { phone } = useAppSelector((state) => state.phoneReducer);
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;
	const descriptions = location && location.descriptions[lang];
	const [createTyreService] = baseDataAPI.useCreateTyreServiceMutation();

	const handleSubmit = async () => {
		setLoading(true);
		setError(null);
		if(!typeCar || !date || !time || form.name.length < 3 || phone.length < 10) {
			setLoading(false);
			if(!typeCar) {
				setError('you have not selected a car type');
			} else if(!date) {
				setError('you have not selected a date');
			} else if(!time) {
				setError('you have not selected a time');
			} else if(form.name.length < 3) {
				setError('incorrect name');
			} else if(phone.length < 10) {
				setError('incorrect phone');
			}
		} else {
			await createTyreService({
				location_id: location?.id,
				date,
				time,
				vehicle_type: typeCar,
				tyre_source: tyreSource,
				customer_name: form.name,
				customer_phone: `+38${ phone }`,
				customer_email: form.email,
				wheel_size: diameter,
				services: [seasonChange, wheelBalancing],
				comment: form.comment,
			}).then((response: { data?: { result: boolean }; error?: FetchBaseQueryError | SerializedError }) => {
				if(response?.data) {
					router.push(`/${params.locale}/tire-service/successful`);
				} else if(response.error) {
					console.error('An error occurred:', response.error);
				}
			}).finally(() => {
				setLoading(false);
			});
		}
	}

	return (
		<>
			<h3 className='text-2xl font-bold mb-6'>{ t('confirm your tire fitting appointment') }</h3>
			{ error && <Alert color='danger' className='mb-6' title={ t(error) } /> }
			<Table hideHeader aria-label="Example static collection table">
				<TableHeader>
					<TableColumn>NAME</TableColumn>
					<TableColumn>ROLE</TableColumn>
				</TableHeader>
				<TableBody >
					<TableRow key="1">
						<TableCell className='font-bold'>{ form.name }</TableCell>
						<TableCell className='font-bold'>{ form.auto }</TableCell>
					</TableRow>
					<TableRow key="2">
						<TableCell className='font-bold'>+38{ phone }</TableCell>
						<TableCell className='font-bold'>{ form.model }</TableCell>
					</TableRow>
					<TableRow key="3">
						<TableCell className='font-bold'>{ form.email }</TableCell>
						<TableCell className='font-bold'>{ form.num }</TableCell>
					</TableRow>
					<TableRow key="4">
						<TableCell className='font-bold'>{ form.comment }</TableCell>
						<TableCell className='font-bold'> </TableCell>
					</TableRow>
					<TableRow key="5">
						<TableCell className='font-bold'>{ descriptions?.name }</TableCell>
						<TableCell className='font-bold'>{ descriptions?.address }</TableCell>
					</TableRow>
					<TableRow key="6">
						<TableCell className='font-bold'>{ descriptions?.phone }</TableCell>
						<TableCell className='font-bold'> </TableCell>
					</TableRow>
					<TableRow key="7">
						<TableCell className='font-bold'>{ typeCar && t(typeCar) }</TableCell>
						<TableCell className='font-bold'>{ diameter && 'R' + diameter }</TableCell>
					</TableRow>
					<TableRow key="8">
						<TableCell className='font-bold'>{ tyreSource && t(tyreSource) }</TableCell>
						<TableCell className='font-bold'>{ time }</TableCell>
					</TableRow>
					<TableRow key="9">
						<TableCell className='font-bold'>{ wheelBalancing && t('wheel balancing') }</TableCell>
						<TableCell className='font-bold'>{ date }</TableCell>
					</TableRow>
					<TableRow key="10">
						<TableCell className='font-bold'>{ seasonChange && t('seasonal tire replacement') }</TableCell>
						<TableCell className='font-bold'> </TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<div className='flex justify-end mt-6'>
				<Button isLoading={ loading } onPress={ handleSubmit } isDisabled={ loading } >
					{ t('confirm') }
				</Button>
			</div>
		</>
	)
};

export default Confirm;
