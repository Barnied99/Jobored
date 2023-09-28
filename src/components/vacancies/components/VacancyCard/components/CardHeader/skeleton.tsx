import { Group, Skeleton } from '@mantine/core';

export const CardHeaderSkeleton = () => {
	return (
		<Group position="apart" noWrap>
			<Skeleton height={20} />
		</Group>
	);
};
