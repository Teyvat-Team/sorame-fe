import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Button, Input, Select, Switch } from 'antd';
import { overviewState } from '@stores/overview';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IconTick } from '@douyinfe/semi-icons';
import { COLOR_PALETTE } from '@const/theme/color';
import { withSemiIconStyle } from '@/style';
import { userState } from '@stores/user';

const { Option } = Select;

const { useRef, useState, useEffect, useMemo } = React;

interface DatasetFilterProps {}

const Container = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-evenly;
`;

const InputContainer = styled.section`
  /** equals to flex: 1 */
  flex-grow: 1;
`;

const OtherContainer = styled.section`
  flex-basis: 280px;
  display: flex;
  flex-direction: row-reverse;
  .ant-btn {
    :hover {
      border: none !important;
      background-color: ${COLOR_PALETTE.SORAME_INPUT_HOVER_BG}!important;
    }
  }
`;

const DatasetFilter: React.FC<DatasetFilterProps> = (
  props: DatasetFilterProps
) => {
  const {} = props;

  const [isOnlySeeMine, setIsOnlySeeMine] = useState(false);

  const setStoreFilterVal = useSetRecoilState(overviewState);

  const user = useRecoilValue(userState);

  const setFilterValue = React.useCallback((value: string) => {
    setStoreFilterVal(state => {
      return {
        ...state,
        datasetFilterVal: {
          ...state.datasetFilterVal,
          keyword: value,
        },
      };
    });
  }, []);

  const onValChange = React.useCallback((e: React.BaseSyntheticEvent) => {
    setFilterValue(e.target.value);
  }, []);

  const onSelectChange = React.useCallback(
    (value: 'newest' | 'mostPopular') => {
      setStoreFilterVal(state => {
        return {
          ...state,
          datasetFilterVal: {
            ...state.datasetFilterVal,
            order: 'desc',
            orderBy: value === 'newest' ? 'createTime' : 'popularity',
          },
        };
      });
    },
    []
  );

  const toggleIsOnlySeeMine = React.useCallback(() => {
    setStoreFilterVal(state => {
      return {
        ...state,
        datasetFilterVal: {
          ...state.datasetFilterVal,
          createUser: state.datasetFilterVal.createUser
            ? ''
            : user.username || '',
        },
      };
    });
    setIsOnlySeeMine(prev => !prev);
  }, []);

  return (
    <Container>
      <InputContainer>
        <Input
          size="middle"
          placeholder="筛选"
          onChange={onValChange}
          allowClear
        />
      </InputContainer>
      <OtherContainer>
        <Select
          placeholder="排序"
          allowClear
          style={{ width: 120 }}
          onSelect={onSelectChange}
        >
          <Option value="mostPopular">最热</Option>
          <Option value="newest">最新</Option>
        </Select>
        <Button
          icon={
            isOnlySeeMine ? (
              <IconTick
                style={withSemiIconStyle({
                  marginRight: 8,
                  color: COLOR_PALETTE.SORAME_GREEN,
                })}
              />
            ) : null
          }
          onClick={toggleIsOnlySeeMine}
          style={{
            transition: 'all 0.3s',
            background: COLOR_PALETTE.SORAME_INPUT_BACKGROUND,
            marginRight: 24,
            color: isOnlySeeMine
              ? COLOR_PALETTE.SORAME_BLACK
              : COLOR_PALETTE.SORAME_INPUT_PLACEHOLDER_COLOR,
          }}
        >
          只看我的
        </Button>
      </OtherContainer>
    </Container>
  );
};

export default DatasetFilter;
