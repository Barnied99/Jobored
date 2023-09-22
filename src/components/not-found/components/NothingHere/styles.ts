import { createStyles, rem } from '@mantine/core';

const IMAGE_ASPECT_RATIO = '1.04 / 1';

export const useStyles = createStyles(() => ({
	image: {
		maxWidth: 240,
		aspectRatio: IMAGE_ASPECT_RATIO,
	},

	title: {
		fontSize: rem(24),
		textAlign: 'center',
	},

	button: {
		fontSize: rem(14),
	},
}));
