import React, { FC, useState, useEffect } from 'react';
import Overview from './overview';
import SalePercent from './salePercent';
import TimeLine from './timeLine';
import './index.less';
import { useGetDataSource } from '@/api';

const DashBoardPage: FC = () => {
  const [loading, setLoading] = useState(true);

  const { data, error } = useGetDataSource();

  if (!error) {
    console.log('%c data >>>', 'background: yellow; color: blue', data);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(undefined as any);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div>
      {/* <Overview loading={loading} />

      <SalePercent loading={loading} />
      <TimeLine loading={loading} /> */}
    </div>
  );
};

export default DashBoardPage;
