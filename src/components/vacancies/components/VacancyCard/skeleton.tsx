import { Paper, Stack } from '@mantine/core';

import {
	CardHeaderSkeleton,
	LocationSkeleton,
	WorkTypeSkeleton,
} from './components';

export const VacancyCardSkeleton = () => {
	return (
		<Paper component="article" p={23} pb={18} pt={20} withBorder>
			<Stack spacing={17}>
				<CardHeaderSkeleton />
				<WorkTypeSkeleton />
				<LocationSkeleton />
			</Stack>
		</Paper>
	);
};
