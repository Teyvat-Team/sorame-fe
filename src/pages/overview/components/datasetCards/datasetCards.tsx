import styled from '@emotion/styled';
import * as React from 'react';
import SingleCard from './components/singleCard';

const { useRef, useState, useEffect, useMemo } = React;

interface DatasetCardsProps {
  data: API.DataSetListResponse['data'];
  isLoading: boolean;
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const DatasetCards: React.FC<DatasetCardsProps> = (
  props: DatasetCardsProps
) => {
  const { data, isLoading } = props;

  return (
    <Container>
      {data.reduce((acc, cur) => {
        return [
          ...acc,
          ...cur.dataSetList.map(table => (
            <SingleCard
              key={table.tableId}
              tableInfo={table}
              isLoading={isLoading}
            />
          )),
        ];
      }, [])}
      {/* <SingleCard
        // key={data[0].dataSetList[0].tableId}
        tableInfo={data?.[0]?.dataSetList?.[0]}
        isLoading={isLoading}
      /> */}
    </Container>
  );
};

export default DatasetCards;
