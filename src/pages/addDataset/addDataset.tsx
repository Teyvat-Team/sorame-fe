import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router';
import { Alert, Button, message, PageHeader, Typography } from 'antd';

import { Transfer } from '@douyinfe/semi-ui';
import { useAddDataSet, useGetDataSourceTable } from '@/api';
import ContentSkeleton from '@components/contentSkeleton';
import ErrorIllustrator from '@components/illustration/errorIllustrator';
import Loading from '@components/illustration/loading';
import { loadingZIndex } from '@const/theme/measurement';
import { Collapse } from '@douyinfe/semi-ui';
import { Form, Input } from 'antd';

const { TextArea } = Input

const { useForm } = Form;

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
import OpFooter from './components/opFooter';
import { useLocale } from '@/locales';
import to from 'await-to-js';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@stores/user';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import { overviewState } from '@stores/overview';


const { useRef, useState, useEffect, useMemo } = React;



const height = 64 + 48 + 48;

const Container = styled.section`
  max-height: calc(100% - 48px);
  height: calc(100% - 48px);
  overflow-y: auto;
`;

const InnerContainer = styled.section`
  max-width: 1100px;
  padding: 48px 48px;
  margin: 0 auto;
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
        dbName: cur.dbName,
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

  const { datasource: datasourceName = '' } = useParams();

  const user = useRecoilValue(userState);

  const { formatMessage } = useLocale();

  const navigate = useNavigate();

  const [selectedTable, setSelectedTable] = useState<
    (DataItem & {
      formAPI?: FormApi;
    })[]
  >([]);

  const [form] = useForm();

  const setOverviewState = useSetRecoilState(overviewState);

  /** query */

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
          `???????????????????????????????????????????????????${
            err?.response?.data?.error || err?.message || '????????????'
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
      staleTime: 1000 * 60, //  1min
      onSuccess: getDataSourceTableReqParams?.onSuccess,
      onError: getDataSourceTableReqParams?.onError,
    }
  );

  /** mutation */
  const addDataSetMutation = useAddDataSet({
    onError: (e: API.ErrorResp) => {
      message.error(`???????????????????????????????????????${e?.response?.data?.error || e?.message}`);
    },
    onSuccess: res => {
      message.success('???? ????????????????????? ???? ');
      navigate('/overview');
      setOverviewState(prev => ({
        ...prev,
        needRefresh: true,
      }));
    },
  });

  /** component methods */

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
      const newItems = items.filter(
        item => !selectedTable.find(i => i.key === item.key)
      );
      const deletedItems = selectedTable.filter(
        s => !items.find(i => i.key === s.key)
      );

      setSelectedTable(prev => {
        return [
          ...prev.filter(s => !deletedItems.find(i => i.key === s.key)),
          ...newItems,
        ];
      });
    },
    [selectedTable]
  );

  const onClickFinish = React.useCallback(async () => {

    if (!form?.validateFields) {
      message.error('???????????????API');
      return;
    }

    const [metaErr, metaRes] = await to(form?.validateFields()) as unknown as [Error, {
      datasetName: string;
      description: string;
    }]

    if (metaErr) {
      message.error(`????????????????????????????????????????????????`);
      return;
    }

    if (selectedTable?.length === 0) {
      message.error('??????????????????');
      return;
    }
    const [err, res] = await to(
      Promise.all(
        selectedTable?.map((item, tableIdx) =>
          item?.formAPI?.validate?.()?.catch(e => {
            message.error(
              `????????????, ???${tableIdx + 1}?????????${
                item?.label
              }?????????????????????????????????`
            );
            throw e;
          })
        ) ?? []
      )
    );
    if (err) {
      return;
    }

    const createTableList = selectedTable.map((item, sIdx) => {
      const attr = Object.entries(
        (res?.[sIdx] || {}) as {
          [key: string]: string;
        }
      )?.reduce<API.Attr>?.(
        (acc, [k, v]) => ({
            ...acc,
            dimension:
              v === 'dimension' ? [...acc.dimension, k] : acc.dimension,
            matrix: v === 'matrix' ? [...acc.matrix, k] : acc.matrix,
          }),
        {
          dimension: [],
          matrix: [],
        }
      );
      return {
        name: metaRes?.datasetName || '',
        descr: metaRes?.description || '',
        dataSourceName: datasourceName?.toString?.() || '',
        dbName: (item?.dbName as string) || '',
        tableId: item?.label?.toString?.() || '', // tableId ?????? tableName
        createUser: user?.username || 'admin',
        attr,
      };
    });
    addDataSetMutation.mutateAsync({
      createTableList,
    });
  }, [selectedTable, datasourceName, user]);

  return (
    <>
      <Container>
        <InnerContainer>
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
            style={{ padding: 0, paddingBottom: 0 }}
            title={<Typography.Title level={1}>???????????????</Typography.Title>}
          />
          <Form layout="vertical" form={form}>
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
              <ErrorIllustrator
                title="?????????????????????????????????????????????????????????????????????????????????????????????"
                desc={
                  <Button
                    type="primary"
                    onClick={() => {
                      navigate('/');
                    }}
                  >
                    {formatMessage({ id: 'gloabal.tips.backHome' })}
                  </Button>
                }
              ></ErrorIllustrator>
            )}
            {isSuccess && (
              <>
                {isDatasourceTreeEmpty ? (
                  <Empty desc="?????????????????????????????????????????????????????????????????????????????????????????????" />
                ) : (
                  <>
                  <Typography.Title
                      level={3}
                      style={{
                        marginTop: '24px',
                        marginBottom: '24px',
                      }}
                    >
                      ??????????????????????????????
                    </Typography.Title>
                    <Form.Item
                      name="datasetName"
                      label="???????????????"
                      rules={[
                        {
                          required: true,
                          message: '????????????????????????',
                        },
                      ]}
                    >
                      <Input
                        placeholder="????????????????????????"
                      />
                      </Form.Item>
                      <Form.Item
                      name="description"
                      label="???????????????"
                      rules={[
                        {
                          required: true,
                          message: '????????????????????????',
                        },
                      ]}
                    >
                      <TextArea
                        placeholder='????????????????????????'
                      />
                      </Form.Item>
                    <Typography.Title
                      level={3}
                      style={{
                        marginTop: '24px',
                        marginBottom: '24px',
                      }}
                    >
                      ???????????????
                    </Typography.Title>
                    <Alert
                      style={{
                        borderColor: COLOR_PALETTE.SORAME_BLUE,
                        marginBottom: 28,
                        marginTop: 3,
                      }}
                      description={
                        <>
                          <section>?????????????????????10????????????</section>
                        </>
                      }
                      type="info"
                      showIcon
                      icon={
                        <IconInfoCircle
                          style={{ }}
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
                        height: 528,
                      }}
                      dataSource={datasourceTree}
                      type="treeList"
                      renderSelectedItem={renderSelectedTableItem}
                      emptyContent={{
                        left: <Empty />,
                        right: <Empty title="??????????????????" />,
                        search: <Empty style={{
                          marginTop: '400px',
                        }}title="??????????????????????????????" />,
                      }}
                      onChange={onSelectedTableChange}
                    ></Transfer>
                    {typeof selectedTable?.[0]?.key?.toString?.() ===
                      'string' && (
                      <>
                        <Typography.Title
                          level={3}
                          style={{
                            marginTop: '24px',
                            marginBottom: '24px',
                          }}
                        >
                          ??????????????????????????????
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
                                borderColor:
                                  COLOR_PALETTE.SORAME_INPUT_BACKGROUND,
                              }}
                              header={
                                <section
                                  css={css`
                                    margin-top: 8px;
                                  `}
                                >
                                  <Typography.Title
                                    level={5}
                                    style={{
                                      marginLeft: '28px',
                                    }}
                                  >
                                    {`????????????${item.label}???`}
                                  </Typography.Title>
                                </section>
                              }
                              itemKey={item?.key?.toString() || index.toString()}
                            >
                              <TableAttrCollapse
                                table={item}
                                extraInfo={{
                                  dbName: item?.dbName || '',
                                  datasourceName:
                                    datasourceName?.toString?.() || '',
                                }}
                                getFormApi={(formAPI: FormApi) => {
                                  setSelectedTable(curSelected => {
                                    const selectedIdx = curSelected.findIndex(
                                      i => i.key === item?.key?.toString()
                                    );
                                    return [
                                      ...curSelected.slice(0, selectedIdx),
                                      {
                                        ...item,
                                        formAPI,
                                      },
                                      ...curSelected.slice(selectedIdx + 1),
                                    ];
                                  });
                                }}
                              ></TableAttrCollapse>
                            </Collapse.Panel>
                          ))}
                        </Collapse>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </Form>
        </InnerContainer>
      </Container>
      <OpFooter>
        <Button
          type="primary"
          style={{
            marginRight: '24px',
          }}
          disabled={false}
          onClick={onClickFinish}
        >
          ??????
        </Button>
      </OpFooter>
    </>
  );
};

export default AddDataset;
