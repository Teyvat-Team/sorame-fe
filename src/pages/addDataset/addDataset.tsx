import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useParams } from 'react-router';
import { Alert, message, PageHeader, Typography } from 'antd';

import { Transfer } from '@douyinfe/semi-ui';
import { useGetDataSourceTable } from '@/api';
import ContentSkeleton from '@components/contentSkeleton';
import ErrorIllustrator from '@components/illustration/errorIllustrator';
import Loading from '@components/illustration/loading';
import { loadingZIndex } from '@const/theme/measurement';
import { Collapse } from '@douyinfe/semi-ui';

import {
  RenderSelectedItemProps,
  DataItem,
} from '@douyinfe/semi-ui/lib/es/transfer';
import Empty from '@components/illustration/empty';
import {
  IconArrowLeft,
  IconBackward,
  IconClose,
  IconDelete,
  IconInfoCircle,
} from '@douyinfe/semi-icons';
import { COLOR_PALETTE } from '@const/theme/color';
import { withSemiIconStyle } from '@/style';
import TableAttrCollaspe from './components/tableAttrCollapse';
import TableAttrCollapse from './components/tableAttrCollapse';

const { useRef, useState, useEffect, useMemo } = React;

const Container = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  margin-top: 48px;
  padding: 0 24px;
`;

interface AddDatasetProps {}

const formatDataSourceTree: (
  dataSourceTree: API.TableList[],
  isDisabled?: boolean
) => DataItem[] = (dataSourceTree, isDisabled) => {
  return dataSourceTree?.map?.(cur => {
    return {
      label: cur.dbName,
      key: cur.dbName,
      value: cur.dbName,
      disabled: isDisabled || false,
      children: cur.dbTable.map(item => ({
        label: item.tableName,
        key: item.tableId,
        value: item.tableId,
        disabled: isDisabled || false,
      })),
    };
  });
};

const renderSelectedTableItem:
  | ((item: RenderSelectedItemProps) => React.ReactNode)
  | undefined = item => {
  return (
    <div key={item.key}>
      <section
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 48px;
          :hover {
            background-color: ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND};
          }
          border-bottom: 1px solid ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND};
        `}
      >
        <section
          css={css`
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          {item.label}
        </section>
        <IconDelete
          style={{
            flexBasis: '48px',
            color: COLOR_PALETTE.SORAME_RED,
            cursor: 'pointer',
          }}
          onClick={item.onRemove}
        />
      </section>
    </div>
  );
};

const AddDataset: React.FC<AddDatasetProps> = (props: AddDatasetProps) => {
  const {} = props;

  const { datasource: datasourceName } = useParams();

  const [selectedTable, setSelectedTable] = useState<DataItem[]>([]);

  const [getDataSourceTableReqParams, setGetDataSourceTableReqParams] =
    React.useState({
      enableRequest: true,
      onSuccess: () => {
        setGetDataSourceTableReqParams({
          ...getDataSourceTableReqParams,
          enableRequest: false,
        });
      },
      onError: (err: API.ErrorResp) => {
        message.error(
          `未找到数据集下的数据表，错误信息：${
            err?.response?.data?.error || err?.message || '未知错误'
          }`
        );
        setGetDataSourceTableReqParams({
          ...getDataSourceTableReqParams,
          enableRequest: false,
        });
      },
    });

  const { isLoading, isSuccess, isError, data, error } = useGetDataSourceTable(
    {
      dataSourceName: datasourceName || '',
    },
    {
      enabled: getDataSourceTableReqParams?.enableRequest,
      retry: false,
      cacheTime: 1000 * 60, //  1min
      onSuccess: getDataSourceTableReqParams?.onSuccess,
      onError: getDataSourceTableReqParams?.onError,
    }
  );

  const datasourceTree = formatDataSourceTree(
    data?.data || [],
    selectedTable.length >= 10
  );

  const isDatasourceTreeEmpty = useMemo(
    () => datasourceTree.length === 0,
    [datasourceTree]
  );

  const onSelectedTableChange = React.useCallback(
    (values: Array<string | number>, items: Array<DataItem>) => {
      setSelectedTable(items);
    },
    []
  );

  return (
    <>
      <Container>
        <PageHeader
          backIcon={
            <IconArrowLeft
              style={{
                fontSize: '24px',
                paddingBottom: '18px',
              }}
            />
          }
          onBack={() => window.history.back()}
          style={{ padding: 0, paddingBottom: 48 }}
          title={<Typography.Title level={1}>新建数据集</Typography.Title>}
        />
        {isLoading && (
          <>
            <Loading
              style={{
                zIndex: loadingZIndex,
                display: 'flex',
                position: 'absolute',
                top: '30%',
                left: '50%',
                justifyContent: 'center',
              }}
            ></Loading>
            <ContentSkeleton
              style={{ padding: 14, overflow: 'hidden', maxWidth: '100%' }}
            ></ContentSkeleton>
          </>
        )}
        {isError && (
          <ErrorIllustrator desc="未找到已有数据源下的数据库，请检查数据源名称是否正确或刷新重试"></ErrorIllustrator>
        )}
        {isSuccess && (
          <>
            {isDatasourceTreeEmpty ? (
              <Empty desc="未找到已有数据源下的数据库，请检查数据源名称是否正确或刷新重试" />
            ) : (
              <>
                <Typography.Title
                  level={3}
                  style={{
                    marginTop: '24px',
                    marginBottom: '24px',
                  }}
                >
                  选择数据表
                </Typography.Title>
                <Alert
                  style={{
                    borderColor: COLOR_PALETTE.SORAME_BLUE,
                    marginBottom: 28,
                    marginTop: 3,
                  }}
                  description={
                    <>
                      <section>注意：最多选择10张数据表</section>
                    </>
                  }
                  type="info"
                  showIcon
                  icon={
                    <IconInfoCircle
                      style={withSemiIconStyle({ paddingRight: 12 })}
                    />
                  }
                  closable={true}
                  closeIcon={
                    <IconClose
                      style={withSemiIconStyle({
                        color: COLOR_PALETTE.SORAME_LIGHT_BLACK,
                      })}
                    />
                  }
                />
                <Transfer
                  style={{
                    // maxHeight: 'calc(100vh - 300px)',
                    height: 430,
                  }}
                  dataSource={datasourceTree}
                  type="treeList"
                  renderSelectedItem={renderSelectedTableItem}
                  emptyContent={{
                    left: <Empty />,
                    right: <Empty title="未选择数据表" />,
                    search: <Empty title="没有符合搜索条件的表" />,
                  }}
                  onChange={onSelectedTableChange}
                ></Transfer>
                {typeof selectedTable?.[0]?.key?.toString?.() === 'string' && (
                  <>
                    <Typography.Title
                      level={3}
                      style={{
                        marginTop: '24px',
                        marginBottom: '24px',
                      }}
                    >
                      指定数据表维度和指标
                    </Typography.Title>
                    <Collapse
                      style={{
                        borderColor: COLOR_PALETTE.SORAME_INPUT_BACKGROUND,
                      }}
                      keepDOM={true}
                      defaultActiveKey={
                        selectedTable?.[0]?.key?.toString?.() || '0'
                      }
                    >
                      {selectedTable?.map?.((item, index) => (
                        <Collapse.Panel
                          style={{
                            borderColor: COLOR_PALETTE.SORAME_INPUT_BACKGROUND,
                          }}
                          header={`数据表「${item.label}」`}
                          itemKey={item?.key?.toString() || index.toString()}
                        >
                          <TableAttrCollapse></TableAttrCollapse>
                        </Collapse.Panel>
                      ))}
                    </Collapse>
                  </>
                )}
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default AddDataset;
