import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Card, Descriptions } from 'antd';

const { Meta } = Card;

const { useRef, useState, useEffect, useMemo } = React;

const cardStyle: React.CSSProperties = {
  maxWidth: '500px',
  marginRight: '48px',
  marginBottom: '48px',

};

interface SingleCardProps {
  tableInfo: API.DataSetList;
  isLoading: boolean;
}

const SingleCard: React.FC<SingleCardProps> = (props: SingleCardProps) => {
  const { tableInfo, isLoading } = props;

  return (
    <>
      <Card
        style={cardStyle}
        title={tableInfo?.tableName || ''}
        loading={isLoading}
      >
        <Descriptions column={1}>
          <Descriptions.Item label="描述">
            {tableInfo?.descr || ''}
          </Descriptions.Item>
          <Descriptions.Item label="创建者">
            {tableInfo?.createUser || ''}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};

export default SingleCard;
