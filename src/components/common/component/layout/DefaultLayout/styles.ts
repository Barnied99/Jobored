import { createStyles, keyframes } from '@mantine/core';

interface LayoutProps {
	headerHeight: number;
}

export const bounce = keyframes({
	'from, 20%, 53%, 80%, to': { transform: 'translate3d(0, 0, 0)' },
	'40%, 43%': { transform: 'translate3d(0, -1.475rem, 0)' },
	'70%': { transform: 'translate3d(0, -0.9375rem, 0)' },
	'90%': { transform: 'translate3d(0, -0.25rem, 0)' },
});

export const useStyles = createStyles(
	(theme, { headerHeight }: LayoutProps) => ({
		header: {
			height: headerHeight,
		},

		header__link: {
			height: '35%',
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
			height: '40%',
			aspectRatio: '141 / 36',
			animation: `${bounce} 3s ease-in-out infinite`,
		},

		drawer: {
			['& .mantine-Drawer-header']: {
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				height: headerHeight,
				padding: '0 12px',
			},

			['.mantine-Drawer-close']: {
				color: theme.black,
			},
			['.mantine-Drawer-body']: {
				display: 'flex',
				flexDirection: 'column',
				paddingLeft: 0

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
