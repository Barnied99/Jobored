import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({


    compensation: {
        fontWeight: 700,
    },

    breadcrumbs: {
        flexWrap: 'wrap',

        [theme.fn.smallerThan('md')]: {
            ['.mantine-Breadcrumbs-separator']: {
                display: 'none',
            },

            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 11,
        },
    },

    skeletonBreadcrumbs: {
        display: 'flex',
        width: '100%',
        maxWidth: '500px',

        [theme.fn.smallerThan('md')]: {
            ['.mantine-Breadcrumbs-separator']: {
                display: 'none',
            },

            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 11,
        },
    },
}));
