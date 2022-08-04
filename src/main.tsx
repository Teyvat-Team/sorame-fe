import React, { Suspense, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import axios, { AxiosContext } from './api/request';

import './index.css';
import App from './App';
import SuspendFallbackLoading from './components/illustration/loading';
import { Global } from '@emotion/react';
import globalStyles from './style';
import { css } from '@emotion/react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: false,
    },
  },
});

const AxiosProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const axiosValue = useMemo(() => {
    return axios;
  }, []);

  return (
    <AxiosContext.Provider value={axiosValue}>{children}</AxiosContext.Provider>
  );
};

ReactDOM.render(
  <AxiosProvider>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Global styles={globalStyles} />
        <Suspense
          fallback={
            <section
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <SuspendFallbackLoading style={{ width: 45, height: 45 }} />
            </section>
          }
        >
          <App />
        </Suspense>
      </RecoilRoot>
    </QueryClientProvider>
  </AxiosProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
