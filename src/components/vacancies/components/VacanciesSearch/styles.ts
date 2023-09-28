import { createStyles, rem } from '@mantine/core';

const SEARCH_ICON_LEFT_PADDING = 14;
const SEARCH_ICON_WIDTH = 13;

interface VacancyPageStylesProps {
	iconSectionWidth: number;
}

export const useStyles = createStyles(
	(_, { iconSectionWidth }: VacancyPageStylesProps) => ({
		searchInput: {
			['& .mantine-Input-input']: {
				fontSize: rem(14),
			},
		},

		searchIcon: {
			width: SEARCH_ICON_WIDTH,
			boxSizing: 'content-box',
			aspectRatio: '1 / 1',
			paddingLeft: SEARCH_ICON_LEFT_PADDING,
			paddingRight:
				iconSectionWidth - SEARCH_ICON_LEFT_PADDING - SEARCH_ICON_WIDTH,
		},

		inputButton: {
			paddingLeft: 19,
			paddingRight: 19,
			fontSize: rem(14),
		},
	})
);
