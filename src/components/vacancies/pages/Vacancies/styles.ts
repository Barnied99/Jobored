import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
	columnsWrapper: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		width: '100%',
		minWidth: '440px',
		maxWidth: '1160px'
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
