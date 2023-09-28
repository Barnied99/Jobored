import { Breadcrumbs, Group, Paper, Skeleton, Stack } from '@mantine/core';

import { useStyles } from './styles';

export const VacancyHeaderSkeleton = () => {
	const { classes } = useStyles();

	return (
		<Paper component="article" p={23} pb={18} pt={17} withBorder>
			<Stack spacing={17}>
				<Group position="apart" noWrap>
					<Skeleton height={24} />
				</Group>
				<Group>
					<Breadcrumbs
						separator={<div className={classes.separator} />}
						className={classes.skeletonBreadcrumbs}
					>
						<Skeleton height={16} />
						<Skeleton height={16} />
					</Breadcrumbs>
				</Group>
				<Group spacing={12}>
					<Skeleton height={16} className={classes.skeletonLocation} />
				</Group>
			</Stack>
		</Paper>
	);
};
