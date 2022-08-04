import { DefaultOptions } from 'react-query';

export const reactQueryDefaultOptions: DefaultOptions<unknown> = {
  queries: {
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  },
};
