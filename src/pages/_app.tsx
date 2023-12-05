import { useCallback, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

import store from '@/store/store/store';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { loginUser, refreshTokens } from '@/components/auth/api';
import {
  ACCESS_TOKEN_KEY,
  EXPIRE_DATE_KEY,
  REFRESH_TOKEN_KEY,
} from '@/components/common/constants';
import { DefaultLoader } from '@/components/common/component';
import { getToken, setToken } from '@/components/common/services';
// import registerSW from '@/utills/registerSW'

import type { AppProps } from 'next/app'


// const overrides: MantineThemeOverride = {

//   globalStyles: () => ({

//     body: {
//       overflowY: 'scroll',
//       scrollbarGutter: 'stable',
//     },
//   }),
//   colorScheme: 'light',
//   colors: {
//     dark: [
//       '#d5d7e0',
//       '#acaebf',
//       '#8c8fa3',
//       '#666980',
//       '#4d4f66',
//       '#34354a',
//       '#2b2c3d',
//       '#1d1e30',
//       '#0c0d21',
//       '#01010a',
//     ],
//   },
//   components: {
//     Paper: {
//       styles: () => ({
//         root: {
//           borderRadius: 10,
//         },
//       }),
//     },

//     Button: {
//       styles: () => ({
//         root: {
//           borderRadius: 10,
//         },
//       }),
//     },

//     Input: {
//       styles: () => ({
//         input: {
//           borderRadius: '10px',
//         },
//       }),
//     },

//     NumberInput: {
//       styles: () => ({
//         input: {
//           borderRadius: '10px',
//         },
//       }),
//     },

//     Select: {
//       styles: () => ({
//         input: {
//           borderRadius: '10px',
//         },
//       }),
//     },
//   },
// };

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnMount: false, refetchOnWindowFocus: false },
  },
});
const FIVE_MINUTES = 1000 * 60 * 5;

const Router = ({ Component, pageProps }: AppProps) => {

  // const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  // const toggleColorScheme = (value) =>
  //   setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));


  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);




  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     registerSW()
  //   }
  // }, [])

  const [isLoading, setIsLoading] = useState(true)
  const refOnce = useRef(false);

  const onRefreshTokens = useCallback(async () => {
    const refreshToken = getToken(REFRESH_TOKEN_KEY);
    try {
      const data = await refreshTokens(refreshToken);

      const nowUtc = new Date().getTime();
      const expirationDate = data.expires_in * 1000 + nowUtc;

      setToken(ACCESS_TOKEN_KEY, data.access_token);
      setToken(REFRESH_TOKEN_KEY, data.refresh_token);
      setToken(EXPIRE_DATE_KEY, expirationDate.toString());
    } catch (err) {
      return;
    }
  }, []);

  const onLoginUser = useCallback(async () => {

    try {
      const data = await loginUser();
      const expirationDate = data.ttl * 1000;
      setToken(ACCESS_TOKEN_KEY, data.access_token);
      setToken(REFRESH_TOKEN_KEY, data.refresh_token);
      setToken(EXPIRE_DATE_KEY, expirationDate.toString());
    } catch (err) {
      console.log(err)
      return;
    }
  }, []);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 800)
    const checkTokenExpiration = () => {
      const nowUtc = new Date().getTime();
      const expirationDate = Number(getToken(EXPIRE_DATE_KEY)) || 0;
      const refreshToken = getToken(REFRESH_TOKEN_KEY);
      const accessToken = getToken(ACCESS_TOKEN_KEY);

      if (
        (!accessToken && !refOnce.current) ||
        (!expirationDate && !refreshToken && !refOnce.current)
      ) {
        onLoginUser();
        refOnce.current = true;
        return;
      }

      const expireDatePassed =
        accessToken &&
        (nowUtc > expirationDate - FIVE_MINUTES || !expirationDate);

      if (expireDatePassed) {
        if (!refOnce.current) onRefreshTokens();
        refOnce.current = true;
        return;
      }
    };

    checkTokenExpiration();
    const timer = setInterval(checkTokenExpiration, 60000);



    return () => {
      clearInterval(timer);
      clearTimeout(loadingTimer);
    };
  }, []);


  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
          <Notifications />
          <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
              <Provider store={store}>
                <main>
                  {isLoading ? <DefaultLoader /> :
                    <Component {...pageProps} />
                  }
                </main>
              </Provider>
            </ErrorBoundary>
          </QueryClientProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>


  )
}

export default Router
