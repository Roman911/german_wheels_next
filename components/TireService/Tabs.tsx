'use client';
import { useTranslations } from 'next-intl';
import { Tabs, Tab } from '@heroui/react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
	CalendarClockIcon,
	CheckSquareIcon,
	MarkerIcon,
	TireServiceIcon,
} from '@/components/Lib/Icons';
import { setSelectedKey } from '@/store/slices/tireService';
import { Key } from '@react-types/shared';

export default function TireServiceTabs() {
	const dispatch = useAppDispatch();
	const { selectedKey } = useAppSelector((state) => state.tireServiceReducer);
	const t = useTranslations('TireService');

	const handleSelectionChange = (key: Key) => {
		dispatch(setSelectedKey(String(key)));
	};

	// Configuration for tabs (makes component easier to extend)
	const tabs = [
		{ key: 'location', icon: <MarkerIcon />, label: t('choose a location') },
		{ key: 'service', icon: <TireServiceIcon />, label: t('choose services') },
		{ key: 'time', icon: <CalendarClockIcon />, label: t('choose a time') },
		{ key: 'confirm', icon: <CheckSquareIcon />, label: t('confirm time') },
	];

	return (
		<div className="flex w-full flex-col mb-6 mt-4">
			<Tabs
				aria-label="Tire Service Steps"
				classNames={{
					tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
					cursor: 'w-full bg-[#22d3ee]',
					tab: 'max-w-fit px-0 h-12',
					tabContent: 'group-data-[selected=true]:text-[#06b6d4]',
				}}
				color="primary"
				variant="underlined"
				selectedKey={selectedKey}
				onSelectionChange={handleSelectionChange}
			>
				{tabs.map(({ key, icon, label }) => (
					<Tab
						key={key}
						title={
							<div className="flex items-center space-x-2">
								{icon}
								<span>{label}</span>
							</div>
						}
					/>
				))}
			</Tabs>
		</div>
	);
}
