import {
  createStyles
}

  from '@mantine/core';

export const useStyles = createStyles(() => ({
  footer: {
    marginTop: 'rem(120px)',
    marginBottom: 'rem(120px)',
    paddingTop: 'calc(var(--mantine - spacing - xl) * 2)',
    paddingBottom: 'calc(var(--mantine - spacing - xl) * 2)',
    backgroundColor: 'light - dark(var(--mantine - color - gray - 0), var(--mantine - color - dark - 6))',
    borderTop: 'rem(1px) solid light - dark(var(--mantine - color - gray - 2), var(--mantine - color - dark - 5))',
    height: '32px'
  },

  logo: {
    maxWidth: 'rem(150px)',
  },

  description: {
    marginTop: 'rem(5px)',
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    paddingTop: '15px',
    paddingBottom: '15px',

  },

  groups: {
    display: 'flex',
    flexWrap: 'nowrap',
    gap: '10px',
    flexDirection: 'row',
  },

  wrapper: {
    width: 'rem(160px)',
  },

  link: {
    display: 'block',
    color: 'light - dark(var(--mantine - color - gray - 6), var(--mantine - color - dark - 1))',
    fontSize: 'var(--mantine - font - size - sm)',
    paddingTop: 'rem(5px)',
    paddingBottom: 'rem(5px)',
  },



}));