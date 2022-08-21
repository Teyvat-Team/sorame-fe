import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Button, Dropdown, Input, Popover, Tag } from '@douyinfe/semi-ui';
import { RenderContent } from '@douyinfe/semi-ui/lib/es/tooltip';
import { IconCaretdown, IconChevronRight } from '@douyinfe/semi-icons';
import { useSetRecoilState } from 'recoil';
import { dataTableState } from '@stores/dataTable';
import { loadingZIndex } from '@/const/theme/measurement';

const { useRef, useState, useEffect, useMemo } = React;

interface MetricTagProps {
  item: API.MetricList & {
    function: {
      name: string;
      value: string;
    };
  };
  functionList: API.FunctionList[];
}

const MetricTag: React.FC<MetricTagProps> = (props: MetricTagProps) => {
  const { item, functionList } = props;

  const setDataTableState = useSetRecoilState(dataTableState);

  const [num, setNum] = useState('');

  return (
    <>
      <Dropdown
        style={{ width: '180px' }}
        render={
          <Dropdown.Menu>
            {functionList
              ?.map(functionItem => {
                if (
                  functionItem.value === 'topK' ||
                  functionItem.value === 'quantile'
                ) {
                  return (
                    <section key={functionItem?.name}>
                      <Popover
                        zIndex={loadingZIndex}
                        position="right"
                        content={
                          <section
                            css={css`
                              display: flex;
                              justify-content: center;
                              align-items: center;
                            `}
                          >
                            <Input
                              style={{
                                minWidth: 220,
                              }}
                              placeholder={
                                functionItem.value === 'topK'
                                  ? '请输入整数'
                                  : '请输入介于0-1之间的小数'
                              }
                              type="number"
                              onChange={(value: string) => {
                                setNum(value);
                              }}
                            />
                            <Button
                              style={{
                                marginLeft: 8,
                              }}
                              onClick={() => {
                                setDataTableState(state => {
                                  const idx =
                                    state.fieldListMatrixList.findIndex(
                                      i => i.name === item.name
                                    );
                                  return {
                                    ...state,
                                    fieldListMatrixList: [
                                      ...state.fieldListMatrixList.slice(
                                        0,
                                        idx
                                      ),
                                      {
                                        ...state.fieldListMatrixList[idx],
                                        function: {
                                          name: `${functionItem.name}(${num})`,
                                          value: `${functionItem.value}(${num})`,
                                        },
                                      },
                                      ...state.fieldListMatrixList.slice(
                                        idx + 1
                                      ),
                                    ],
                                  };
                                });
                              }}
                            >
                              完成
                            </Button>
                          </section>
                        }
                      >
                        <div>
                          <Dropdown.Item
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-start',
                            }}
                          >
                            <section
                              style={{
                                flex: 1,
                              }}
                            >
                              {functionItem.name}
                            </section>
                            <IconChevronRight
                              style={{
                                flexBasis: 12,
                              }}
                            ></IconChevronRight>
                          </Dropdown.Item>
                        </div>
                      </Popover>
                    </section>
                  );
                } else {
                  return (
                    <Dropdown.Item
                      onClick={() => {
                        setDataTableState(state => {
                          const idx = state.fieldListMatrixList.findIndex(
                            i => i.name === item.name
                          );
                          return {
                            ...state,
                            fieldListMatrixList: [
                              ...state.fieldListMatrixList.slice(0, idx),
                              {
                                ...state.fieldListMatrixList[idx],
                                function: {
                                  name: functionItem.name,
                                  value: functionItem.value,
                                },
                              },
                              ...state.fieldListMatrixList.slice(idx + 1),
                            ],
                          };
                        });
                      }}
                    >
                      {functionItem.name}
                    </Dropdown.Item>
                  );
                }
              })
              .filter(item => item)}
          </Dropdown.Menu>
        }
      >
        <Tag
          color="green"
          closable={true}
          onClose={() => {
            setDataTableState(state => {
              return {
                ...state,
                fieldListMatrixList: state.fieldListMatrixList?.filter?.(f => {
                  return f?.name !== item?.name;
                }),
              };
            });
          }}
          style={{
            borderRadius: '14px',
            fontSize: '14px',
            padding: '14px 14px',
            margin: '8px 8px',
          }}
        >
          <IconCaretdown
            style={{
              marginRight: '4px',
              marginTop: '-8px',
            }}
          />
          {item?.function?.name
            ? `${item.function.name}(${item?.name || ''})`
            : item.name || ''}
        </Tag>
      </Dropdown>
    </>
  );
};

export default MetricTag;
