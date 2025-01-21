import TyreDiskSizeCalcComponent from '@/components/TyreDiskSizeCalc';

export default async function TyreDiskSizeCalc({ params }: { params: Promise<{ locale: string }> }) {
	const locale = (await params).locale;

	return (
		<>
			<TyreDiskSizeCalcComponent locale={ locale } />
		</>
	)
}