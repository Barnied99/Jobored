import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
	cardTitle: {
		lineHeight: 1,
	},

	cardTitle__link: {
		fontSize: rem(20),
		lineHeight: 1,
		fontWeight: 600,

		wordBreak: 'break-word',

		['.mantine-Anchor-root']: {
			lineHeight: 1,
		},

		[theme.fn.smallerThan('lg')]: {
			fontSize: rem(18),
		},
	},

	starIcon: {
		width: 22,
		height: 22,
	},
}));
