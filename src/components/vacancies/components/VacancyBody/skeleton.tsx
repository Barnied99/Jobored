import { Paper, Skeleton, Stack } from '@mantine/core';

const SKELETON_ROWS = 12;

export const VacancyBodySkeleton = () => {
	return (
		<Paper p={23} pb={18} pt={17} withBorder>
			<Stack spacing={17}>
				<Skeleton height={16} />
				<Skeleton height={16} />
				{Array(SKELETON_ROWS)
					.fill(1)
					.map((_, idx) => (
						<Skeleton key={idx} height={16} />
					))}
			</Stack>
		</Paper>
	);
};
