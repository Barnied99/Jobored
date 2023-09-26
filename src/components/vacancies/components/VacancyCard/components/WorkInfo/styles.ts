import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
	separator: {
		width: 5,
		height: 5,
		background: theme.colors.gray[6],
		borderRadius: '50%',
		margin: '0 2px',
	},

	compensation: {
		fontWeight: 700,
	},

	breadcrumbs: {
		flexWrap: 'wrap',

		[theme.fn.smallerThan('md')]: {
			['.mantine-Breadcrumbs-separator']: {
				display: 'none',
			},

			flexDirection: 'column',
			alignItems: 'flex-start',
			gap: 11,
		},
	},

	skeletonBreadcrumbs: {
		display: 'flex',
		width: '100%',
		maxWidth: '500px',

		[theme.fn.smallerThan('md')]: {
			['.mantine-Breadcrumbs-separator']: {
				display: 'none',
			},

			flexDirection: 'column',
			alignItems: 'flex-start',
			gap: 11,
		},
	},
}));
