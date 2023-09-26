import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
	cardTitle: {
		lineHeight: 1,
		fontSize: rem(24),
	},

	compensation: {
		fontSize: 20,
		fontWeight: 700,
	},

	workType: {
		fontSize: 20,
	},

	breadcrumbs: {
		flexWrap: 'wrap',
	},

	location: {
		fontSize: 16,
	},

	separator: {
		width: 5,
		height: 5,
		background: theme.colors.gray[6],
		borderRadius: '50%',
		margin: '0 2px',
	},

	skeletonBreadcrumbs: {
		display: 'flex',
		width: '100%',
		maxWidth: '500px',
	},

	skeletonLocation: {
		display: 'flex',
		width: '100%',
		maxWidth: '250px',
	},
}));
