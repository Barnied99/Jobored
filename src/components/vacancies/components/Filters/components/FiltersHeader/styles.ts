import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
	title: {
		fontSize: rem(20),
	},

	resetText__wrapper: {
		cursor: 'pointer',
	},

	resetText: {
		color: theme.colors.gray[5],
		fontSize: rem(14),
		fontWeight: 500,
	},

	closeIcon: {
		width: 16,
		height: 16,
		marginLeft: '5px',
	},
}));
