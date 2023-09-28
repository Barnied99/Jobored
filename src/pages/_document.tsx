import { Html, Head, Main, NextScript } from 'next/document'
import { MantineProvider, MantineThemeOverride } from '@mantine/core';



const overrides: MantineThemeOverride = {
  globalStyles: () => ({
    body: {
      overflowY: 'scroll',
      scrollbarGutter: 'stable',
    },
  }),
  fontFamily: 'Inter',
  components: {
    Paper: {
      styles: () => ({
        root: {
          borderRadius: 14,
        },
      }),
    },

    Button: {
      styles: () => ({
        root: {
          borderRadius: 12,
        },
      }),
    },

    Input: {
      styles: () => ({
        input: {
          borderRadius: '12px',
        },
      }),
    },

    NumberInput: {
      styles: () => ({
        input: {
          borderRadius: '12px',
        },
      }),
    },

    Select: {
      styles: () => ({
        input: {
          borderRadius: '12px',
        },
      }),
    },
  },
};
export const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <MantineProvider theme={overrides}>
          <Main />
          <NextScript />
        </MantineProvider>
      </body>
    </Html>
  )
}

export default Document
