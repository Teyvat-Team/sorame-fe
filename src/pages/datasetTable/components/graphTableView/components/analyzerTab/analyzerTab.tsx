import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { dataTableState } from '@stores/dataTable';
import { Button, Typography } from 'antd';
import { Select } from '@douyinfe/semi-ui';
import {
  IconDelete,
  IconPlus,
  IconPlusCircle,
  IconSave,
} from '@douyinfe/semi-icons';
import { COLOR_PALETTE } from '@const/theme/color';
import { withSemiIconStyle } from '@/style';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import {
  Query,
  Builder,
  Utils as QbUtils,
  Fields,
} from 'react-awesome-query-builder';
// types
import {
  JsonGroup,
  Config,
  ImmutableTree,
  BuilderProps,
} from 'react-awesome-query-builder';

import AntdConfig from 'react-awesome-query-builder/lib/config/antd';
import 'react-awesome-query-builder/lib/css/styles.css';

const InitialConfig = AntdConfig;

const queryValue: JsonGroup = { id: 'query', type: 'group' };

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

const WhereCauseWrapper = styled.section`
  margin-right: -12px;
  .group {
    background: ${COLOR_PALETTE.SORAME_WHITE}!important;
    border: none !important;
  }
  .rule--field {
    margin: 8px !important;
  }
  .rule--operator {
    margin: 8px !important;
  }
  .rule--value {
    margin: 8px !important;
  }
  .group--actions {
    opacity: 1 !important;
  }
`;

const AnalyzerTab: React.FC<AnalyzerTabProps> = (props: AnalyzerTabProps) => {
  const {} = props;

  const [tableState, setDataTableState] = useRecoilState(dataTableState);

  const { sortInfo, tableInfo, whereCauseConfig, whereCauseTree } = tableState;

  const [selectedFieldSort, setSelectedFieldSort] =
    useState<API.Sort[]>(sortInfo);

  useEffect(() => {
    if (sortInfo?.length > 0) {
      setSelectedFieldSort(sortInfo);
    }
  }, []);

  const config: Config = useMemo(
    () => ({
      ...InitialConfig,
      fields: tableInfo?.schema?.reduce((acc, field) => {
        return {
          ...acc,
          [field.name]: {
            label: field.name,
            type: 'text',
            valueSources: ['value'],
          },
        };
      }, {}) as Fields,
      settings: {
        ...InitialConfig.settings,
        locale: {
          antd: zh_CN,
        },
        valueLabel: '值',
        valuePlaceholder: '值',
        fieldLabel: '字段',
        operatorLabel: '操作符',
        funcLabel: '函数',
        fieldPlaceholder: '字段',
        funcPlaceholder: '函数',
        operatorPlaceholder: '操作符',
        lockLabel: '锁定',
        lockedLabel: '已锁',
        addGroupLabel: '条件组',
        addRuleLabel: '条件',
        addSubRuleLabel: '子条件',
        valueSourcesPopupTitle: '值来源',
        removeRuleConfirmOptions: {
          title: '确定删除此条件？',
          okText: '确定',
          cancelText: '取消',
        },
        removeGroupConfirmOptions: {
          title: '确定删除此条件组？',
          okText: '确定',
          cancelText: '取消',
        },
      },
    }),
    [dataTableState, tableInfo, tableInfo?.schema]
  );

  const [state, setState] = useState({
    tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
    config: config,
  });

  useEffect(() => {
    if (whereCauseConfig || whereCauseTree) {
      setState({
        tree: whereCauseTree,
        config: whereCauseConfig,
      });
    }
  }, []);

  const onChange = (immutableTree: ImmutableTree, config: Config) => {
    setState({ tree: immutableTree, config: config });
  };

  const renderBuilder = (props: BuilderProps) => (
    <div>
      <div className="qb-lite">
        <Builder {...props} />
      </div>
    </div>
  );

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
                placeholder="字段"
                value={item.field}
                style={{
                  flex: 3,
                  marginRight: '14px',
                  maxWidth: item.field ? '50%' : '100%',
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
                  placeholder="排序"
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
                  style={{ flex: 1, maxWidth: 'auto' }}
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
        <section
          css={css`
            display: flex;
          `}
        >
          <Typography.Title
            level={5}
            style={{
              flex: 1,
            }}
          >
            条件选择
          </Typography.Title>
          <Button
            type="text"
            icon={<IconSave></IconSave>}
            style={{
              color: COLOR_PALETTE.SORAME_BLUE,
              marginLeft: '4px',
              padding: '4px',
              flexBasis: 24,
              marginRight: EDGE_DISTANCE,
            }}
            onClick={() => {
              setDataTableState(prevState => {
                return {
                  ...prevState,
                  whereCause: QbUtils.sqlFormat(state.tree, config) as string,
                  whereCauseTree: state?.tree,
                  whereCauseConfig: state?.config,
                };
              });
            }}
          ></Button>
        </section>
        {useMemo(
          () => (
            <Query
              {...config}
              value={state.tree}
              onChange={onChange}
              renderBuilder={renderBuilder}
            />
          ),
          [
            state,
            tableState,
            config,
            tableInfo,
            tableInfo?.schema,
            whereCauseTree,
            whereCauseConfig,
          ]
        )}
      </WhereCauseWrapper>
    </Container>
  );
};

export default AnalyzerTab;
