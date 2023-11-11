import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    columnsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'flex-start'

    },
    columnsWrapperGroup: {
        display: 'flex',
        flexDirection: 'column',
        flex: 0.33333,
        // flexWrap: 'wrap',
        // width: '100%',
        justifyContent: 'center',
        alignItems: 'center'

    },
    textGroup: {
        display: 'flex',


    },

    flex1: {
        flex: 1,
        overflow: 'auto',
        flexWrap: 'wrap',

    },

    pagination: {
        justifyContent: 'center',
        marginTop: 37,
    },
    text: {
        marginBottom: '10px',
        marginTop: '10px',
    },

    hiddenTabletsAndBelow: {
        [theme.fn.smallerThan('lg')]: {
            display: 'none',
        },
    },
}));
