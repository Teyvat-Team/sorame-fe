import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Card, Descriptions } from 'antd';
import { COLOR_PALETTE } from '@const/theme/color';
import SelectTableModal from './components/selectTableModal';

const { Meta } = Card;

const { useRef, useState, useEffect, useMemo } = React;

const Container = styled.section`
  .ant-card {
    cursor: pointer;
    .ant-card-body {
      overflow-y: auto !important;
    }
  }
`;

const cardStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  marginTop: '24px',
  wordBreak: 'break-all',
  background: COLOR_PALETTE.SORAME_WHITE,
  borderRadius: '8px',
};
interface SingleCardProps {
  datasetInfo?: API.DataSetList[];
  isLoading: boolean;
}

const SingleCard: React.FC<SingleCardProps> = (props: SingleCardProps) => {
  const { datasetInfo, isLoading } = props;

  const handleCardClick = React.useCallback((selectedTable: string) => {
    console.log('%c clicked >>>', 'background: yellow; color: blue', selectedTable);
  }, []);

  return (
    <Container>
      <SelectTableModal
        modalProps={{
          title: `选择数据集「${datasetInfo?.[0]?.name || ''}」下的数据表`,
          okText: '查看',
        }}
        dataInfo={datasetInfo}
        buttonElement={
          <Card
            style={cardStyle}
            title={datasetInfo?.[0]?.name || ''}
            loading={isLoading}
            // onClick={handleCardClick}
          >
            <Descriptions column={1}>
              <Descriptions.Item label="描述">
                {datasetInfo?.[0]?.descr || ''}
              </Descriptions.Item>
              <Descriptions.Item label="创建者">
                {datasetInfo?.[0]?.createUser || 'admin'}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        }
        afterSubmitCallback={handleCardClick}
      />
    </Container>
  );
};

export default SingleCard;
