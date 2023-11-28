import { useCallback, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import Head from 'next/head';

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




const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnMount: false, refetchOnWindowFocus: false },
  },
});
const FIVE_MINUTES = 1000 * 60 * 5;

const Router = ({ Component, pageProps }: AppProps) => {

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
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <Provider store={store}>
            {isLoading ? <DefaultLoader /> :
              <Component {...pageProps} />
            }
          </Provider>
        </ErrorBoundary>
      </QueryClientProvider>
    </>


  )
}

export default Router
