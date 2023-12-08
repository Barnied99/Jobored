import { Html, Head, Main, NextScript } from 'next/document'



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
        <link rel="manifest" href="/site.webmanifest" />
        <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js" async></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
