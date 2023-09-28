import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles(() => ({
	locationIcon: {
		width: 16,
		height: 18,
	},

	locationText: {
		fontSize: rem(16),
	},

	skeletonLocation: {
		display: 'flex',
		width: '100%',
		maxWidth: '250px',
	},
}));
