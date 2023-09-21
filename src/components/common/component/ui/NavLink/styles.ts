import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
	link: {
		textAlign: 'center',
		width: 'fit-content',
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		fontWeight: 500,

		...theme.fn.hover({
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		}),

		[`&.active`]: {
			color: theme.colors[theme.primaryColor][5],
		},

		['& .mantine-NavLink-label']: {
			fontSize: theme.fontSizes.md,
		},
	},
}));
