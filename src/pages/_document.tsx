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
      <Head >
        <meta
          name="description"
          content="Build a PWA to achieve 100% in Google Lighthouse and Next.js Analytics"
        />
        <meta name="theme-color" content="#333333" />
        <meta name="referrer" content={'strict-origin'} />
        <link rel="icon" href="/favicon.svg"></link>
        <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js" async></script>
      </Head>
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
