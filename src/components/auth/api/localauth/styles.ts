import { createStyles } from '@mantine/core';

export const styles = createStyles(() => ({
    app: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }

    ,
    auth: {
        width: '70%',
        maxWidth: '400px',
        borderRadius: '20px',
        border: 'solid 1px #00a8e8',
        padding: '2rem',
        textAlign: 'center',
        height: 'fit-content',
    }

    ,
    authH1: {
        textAlign: 'center',
        color: '#003459',
    }

    ,
    formControlLabel: {
        // display: 'flex',
        color: '#00a8e8',
        fontWeight: 'bold',
        marginBottom: '1rem',
        fontSize: '1rem',
        paddingLeft: '0px',
        // justifyContent: 'flex-start',
        gap: '10px'
    }

    ,
    formControlInput: {
        font: 'inherit',
        // color: '#00a8e8',
        borderRadius: '14px',
        border: '1px  ',
        width: '100%',
        textAlign: 'left',
        // padding: '0.5rem',
        // outline: 'none',
    }

    ,
    formControlInputFocus: {
        border: '1px solid #00a8e8',
        borderRadius: '14px',

    }

    ,
    formControlInputTransparent: {
        backgroundColor: 'transparent',
    }

    ,
    formControlSpan: {
        fontSize: '1rem',
    }

    ,
    formControl: {
        marginTop: '0.5rem',
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    }

    ,
    formAction: {
        marginTop: '0.5rem',
        marginBottom: '3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },



}))

