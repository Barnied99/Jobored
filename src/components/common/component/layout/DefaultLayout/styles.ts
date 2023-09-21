import { createStyles } from '@mantine/core';

interface LayoutProps {
	headerHeight: number;
}

export const useStyles = createStyles(
	(theme, { headerHeight }: LayoutProps) => ({
		header: {
			height: headerHeight,
		},

		header__link: {
			height: '100%',
			paddingLeft: '30px',
			paddingRight: '30px',
		},

		header__container: {
			height: '100%',
		},

		header__layout: {
			height: '100%',
			display: 'grid',
			gridTemplateColumns: '1fr auto 1fr',
		},

		header__burger: {
			gridColumn: -1,
		},

		header__logo: {
			height: '100%',
			aspectRatio: '141 / 36',
		},

		drawer: {
			['& .mantine-Drawer-header']: {
				display: 'flex',
				alignItems: 'center',
				height: headerHeight,
				padding: '0 12px',
			},

			['.mantine-Drawer-close']: {
				color: theme.black,
			},
		},

		hiddenMobile: {
			[theme.fn.smallerThan('sm')]: {
				display: 'none',
			},
		},

		hiddenDesktop: {
			[theme.fn.largerThan('sm')]: {
				display: 'none',
			},
		},

		fullHeight: {
			height: '100%',
		},
	})
);
