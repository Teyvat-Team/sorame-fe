import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { dataTableState } from '@stores/dataTable';
import { Button, Select, Typography } from 'antd';
import {
  IconDelete,
  IconPlus,
  IconPlusCircle,
  IconSave,
} from '@douyinfe/semi-icons';
import { COLOR_PALETTE } from '@const/theme/color';
import { withSemiIconStyle } from '@/style';

const { useRef, useState, useEffect, useMemo } = React;

interface AnalyzerTabProps {}

const EDGE_DISTANCE = 14;

const Container = styled.section`
  padding: ${EDGE_DISTANCE}px;
`;

const SelectGroupSection = styled.section`
  display: flex;
  margin-top: ${EDGE_DISTANCE}px;
  margin-bottom: ${EDGE_DISTANCE}px;
  transition: all 0.3s ease;
`;

const SortWrapper = styled.section`
  margin-bottom: ${EDGE_DISTANCE * 2}px;
  padding-bottom: ${EDGE_DISTANCE * 2}px;
  border-bottom: 2px solid ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND};
`;

const WhereCauseWrapper = styled.section``;

const AnalyzerTab: React.FC<AnalyzerTabProps> = (props: AnalyzerTabProps) => {
  const {} = props;

  const [tableState, setDataTableState] = useRecoilState(dataTableState);

  const { sortInfo, tableInfo } = tableState;

  const [selectedFieldSort, setSelectedFieldSort] =
    useState<API.Sort[]>(sortInfo);

  useEffect(() => {
    if (sortInfo?.length > 0) {
      setSelectedFieldSort(sortInfo);
    }
  }, []);

  return (
    <Container>
      <SortWrapper>
        <section
          css={css`
            display: flex;
            flex-wrap: wrap;
          `}
        >
          <Typography.Title
            level={5}
            style={{
              flex: 1,
              position: 'relative',
              top: '3px',
            }}
          >
            排序
          </Typography.Title>
          <Button
            type="text"
            style={{
              color: COLOR_PALETTE.SORAME_BLUE,
              flexBasis: 24,
              padding: '4px',
            }}
            icon={
              <IconPlusCircle
                style={withSemiIconStyle({
                  marginRight: '4px',
                })}
              ></IconPlusCircle>
            }
            onClick={() => {
              setSelectedFieldSort([
                ...selectedFieldSort,
                { field: '', order: '' },
              ]);
            }}
          >
            添加排序字段
          </Button>
          <section
            css={css`
              flex-basis: 14px;
              display: flex;
              justify-content: flex-end;
            `}
          >
            <Button
              type="text"
              icon={<IconSave></IconSave>}
              style={{
                color: COLOR_PALETTE.SORAME_BLUE,
                marginLeft: '4px',
                padding: '4px',
              }}
              onClick={() => {
                setDataTableState(prevState => {
                  return {
                    ...prevState,
                    sortInfo: selectedFieldSort?.filter(
                      i => i.field && i.order
                    ),
                  };
                });
              }}
            ></Button>
          </section>
        </section>
        {selectedFieldSort?.map((item, idx) => {
          return (
            <SelectGroupSection>
              <Select
                value={item.field}
                style={{
                  flex: 1,
                  marginRight: '14px',
                  maxWidth: '130px',
                }}
                onChange={(val: string) => {
                  setSelectedFieldSort(prev => {
                    return [
                      ...prev.slice(0, idx),
                      {
                        ...prev[idx],
                        field: val,
                      },
                      ...prev.slice(idx + 1),
                    ];
                  });
                }}
              >
                {tableInfo?.schema
                  ?.filter(s => {
                    return selectedFieldSort.every(i => i.field !== s.name);
                  })
                  ?.map(s => {
                    return (
                      <Select.Option value={s.name}>{s.name}</Select.Option>
                    );
                  })}
              </Select>
              {item.field && (
                <Select
                  value={item.order}
                  onChange={(val: string) => {
                    setSelectedFieldSort(prev => {
                      return [
                        ...prev.slice(0, idx),
                        {
                          ...prev[idx],
                          order: val,
                        },
                        ...prev.slice(idx + 1),
                      ];
                    });
                  }}
                  style={{ flex: 1, maxWidth: 150 }}
                >
                  <Select.Option value="asc">升序</Select.Option>
                  <Select.Option value="desc">降序</Select.Option>
                </Select>
              )}
              <Button
                type="text"
                style={{
                  color: COLOR_PALETTE.SORAME_RED,
                  flexBasis: 24,
                  marginLeft: '14px',
                  padding: '4px',
                }}
                onClick={() => {
                  setSelectedFieldSort(prev => {
                    return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
                  });
                }}
                icon={<IconDelete></IconDelete>}
              ></Button>
            </SelectGroupSection>
          );
        })}
      </SortWrapper>
      <WhereCauseWrapper>
        <Typography.Title level={5}>条件选择</Typography.Title>
      </WhereCauseWrapper>
    </Container>
  );
};

export default AnalyzerTab;
