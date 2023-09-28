import { Group, Skeleton } from '@mantine/core';

import { useStyles } from './styles';

export const LocationSkeleton = () => {
	const { classes } = useStyles();

	return (
		<Group spacing={12}>
			<Skeleton height={16} className={classes.skeletonLocation} />
		</Group>
	);
};
