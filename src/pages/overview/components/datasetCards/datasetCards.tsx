import styled from '@emotion/styled';
import * as React from 'react';
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

  return (
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
  );
};

export default DatasetCards;
