import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
	columnsWrapper: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		width: '100%',
	},

	flex1: {
		flex: 1,
	},

	pagination: {
		justifyContent: 'center',
		marginTop: 37,
	},

	hiddenTabletsAndBelow: {
		[theme.fn.smallerThan('lg')]: {
			display: 'none',
		},
	},
}));
