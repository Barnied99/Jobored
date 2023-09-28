import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
	mobileFilters: {
		minWidth: '0 !important',
		marginTop: 16,
		width: '100%',
	},

	accordion: {
		marginBottom: 16,

		['.mantine-Accordion-control']: {
			padding: 0,
		},

		['.mantine-Accordion-content']: {
			padding: 0,
		},

		['.mantine-Accordion-label']: {
			paddingTop: 0,
		},
	},

	accordion__label: {
		['.mantine-Accordion-label']: {
			paddingBottom: 0,
		},
	},

	hiddenDesktop: {
		[theme.fn.largerThan('lg')]: {
			display: 'none',
		},
	},
}));
