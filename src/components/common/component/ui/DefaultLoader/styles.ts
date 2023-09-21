import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
	loader: {
		position: 'fixed',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%,-50%)',
	},
}));
