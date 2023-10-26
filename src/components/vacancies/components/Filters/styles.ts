import { createStyles, rem } from '@mantine/core';

const COLOR_INDEX = 5;

export const useStyles = createStyles((theme) => ({
	filterDesktop__wrapper: {
		padding: 20,
		paddingTop: 14,
		minWidth: 315,
		// display: 'flex',
		// flexDirection: 'column',
		// maxWidth: 315
	},

	filters__select: {
		['.mantine-Select-input']: {
			paddingLeft: 12,
			fontSize: rem(14),
		},

		['.mantine-Select-rightSection']: {
			pointerEvents: 'none',
		},
	},

	closeIcon: {
		width: 16,
		height: 16,
		marginLeft: '5px',
	},

	chevronDownIcon: {
		width: 16,
		height: 8,
	},

	numberInput: {
		['.mantine-Input-input']: {
			paddingLeft: 12,
			fontSize: rem(14),
		},

		['& .mantine-NumberInput-controlUp']: {
			justifyContent: 'flex-start',
			alignItems: 'flex-end',
			paddingLeft: 5,
			paddingTop: 5,

			cursor: 'pointer',
			color: theme.colors.gray[COLOR_INDEX],
			border: 0,
		},

		['& .mantine-NumberInput-controlDown']: {
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
			paddingLeft: 5,
			paddingBottom: 5,

			cursor: 'pointer',
			color: theme.colors.gray[COLOR_INDEX],
			border: 0,
		},
	},

	filterButton: {
		marginTop: 20,
		fontSize: rem(14),
	},
}));
