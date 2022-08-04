import React, { FC, useState, useEffect } from 'react';
import { useGetDataSource } from '@/api';

const DashBoardPage: FC = () => {
  const [getDataSourceReqParams, setGetDataSourceReqParams] = useState({
    enableRequest: true,
    onSuccess: () => {
      setGetDataSourceReqParams({
        ...getDataSourceReqParams,
        enableRequest: false,
      });
    },
    onError: (err: Error) => {
      console.log('%c err >>>', 'background: yellow; color: blue', err);
      setGetDataSourceReqParams({
        ...getDataSourceReqParams,
        enableRequest: false,
      });
    },
  });

  const { isLoading, isSuccess, isError, data, error } = useGetDataSource({
    enabled: getDataSourceReqParams?.enableRequest,
    retry: false,
    cacheTime: 0,
    onSuccess: getDataSourceReqParams?.onSuccess,
    onError: getDataSourceReqParams?.onError,
  });

  console.log('%c  >>>', 'background: yellow; color: blue', {
    isLoading,
    isSuccess,
    isError,
    data,
    error,
  });

  return (
    <div>
      Dashboard
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default DashBoardPage;
