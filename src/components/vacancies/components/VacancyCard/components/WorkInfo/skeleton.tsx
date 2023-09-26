import { Breadcrumbs, Group, Skeleton } from '@mantine/core';

import { useStyles } from './styles';

export const WorkTypeSkeleton = () => {
	const { classes } = useStyles();

	return (
		<Group>
			<Breadcrumbs
				separator={<div className={classes.separator} />}
				className={classes.skeletonBreadcrumbs}
			>
				<Skeleton height={16} />
				<Skeleton height={16} />
			</Breadcrumbs>
		</Group>
	);
};
