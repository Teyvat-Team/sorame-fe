import Empty from '@components/illustration/empty';
import NewDatasetModal from '@components/newDatasetModal';
import { IconPlus } from '@douyinfe/semi-icons';
import styled from '@emotion/styled';
import { withSemiIconStyle } from '@/style';
import { Button } from 'antd';
import * as React from 'react';
import { useNavigate } from 'react-router';
import SingleCard from './components/singleCard';

const { useRef, useState, useEffect, useMemo } = React;
interface DatasetCardsProps {
  data: API.DataSetListResponse['data'];
  isLoading: boolean;
}

const Container = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-gap: 24px;
`;

const DatasetCards: React.FC<DatasetCardsProps> = (
  props: DatasetCardsProps
) => {
  const { data, isLoading } = props;

  const navigate = useNavigate();

  return (
    <>
      {!isLoading && (!data.length || data.length === 0) && (
        <Empty
          style={{
            padding: 28,
            width: '100%',
            margin: '0 auto',
          }}
          title=""
          desc={
            <NewDatasetModal
              modalProps={{
                title: '新建数据集',
              }}
              buttonElement={
                <Button
                  type="primary"
                  icon={
                    <IconPlus
                      style={withSemiIconStyle({
                        marginRight: '12px',
                      })}
                    />
                  }
                >
                  新建数据集
                </Button>
              }
              afterSubmitCallback={(datasource: string) => {
                navigate(`/addDataset/${datasource}`);
              }}
            ></NewDatasetModal>
          }
        ></Empty>
      )}
      <Container>
        {isLoading &&
          new Array(6)
            .fill(null)
            .map((_, index) => <SingleCard key={index} isLoading={true} />)}
        {data.reduce((acc, cur) => {
          if (cur.dataSetList.length > 0) {
            return [
              ...acc,
              <SingleCard
                key={cur.dataSetList[0].id}
                datasetInfo={cur.dataSetList}
                isLoading={isLoading}
              />,
            ];
          } else {
            return acc;
          }
        }, [])}
        {/* <SingleCard
        // key={data[0].dataSetList[0].tableId}
        tableInfo={data?.[0]?.dataSetList?.[0]}
        isLoading={isLoading}
      /> */}
      </Container>
    </>
  );
};

export default DatasetCards;
