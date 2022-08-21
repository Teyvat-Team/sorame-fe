import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Form, Radio } from '@douyinfe/semi-ui';
import { DataItem } from '@douyinfe/semi-ui/lib/es/transfer';
import { useGetTableSchema } from '@/api';
import { message } from 'antd';
import Loading from '@components/illustration/loading';
import { loadingZIndex } from '@const/theme/measurement';
import ContentSkeleton from '@components/contentSkeleton';
import ErrorIllustrator from '@components/illustration/errorIllustrator';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';

const { useRef, useState, useEffect, useMemo } = React;

interface TableAttrCollapseProps {
  table: DataItem;
  extraInfo: {
    dbName: string;
    datasourceName: string;
  };
  getFormApi: (formAPI: FormApi) => unknown;
}

const TableAttrCollapse: React.FC<TableAttrCollapseProps> = (
  props: TableAttrCollapseProps
) => {
  const { table, extraInfo, getFormApi } = props;

  let dataFormApi = null;

  const setDataFormApi = (formApi: FormApi) => {
    dataFormApi = formApi;
    getFormApi?.(formApi);
  };

  const [getTableSchemaReqParams, setGetTableSchemaReqParams] = React.useState({
    enableRequest: true,
    onSuccess: () => {
      setGetTableSchemaReqParams({
        ...getTableSchemaReqParams,
        enableRequest: false,
      });
    },
    onError: (err: API.ErrorResp) => {
      message.error(
        `未找到数据集下的数据表，错误信息：${
          err?.response?.data?.error || err?.message || '未知错误'
        }`
      );
      setGetTableSchemaReqParams({
        ...getTableSchemaReqParams,
        enableRequest: false,
      });
    },
  });

  const { isLoading, isSuccess, isError, data, error } = useGetTableSchema(
    {
      tableId: table?.label?.toString?.() || '',
      dbName: extraInfo?.dbName || '',
      dataSourceName: extraInfo?.datasourceName || '',
    },
    {
      enabled: getTableSchemaReqParams?.enableRequest,
      retry: false,
      staleTime: 1000 * 60, //  1min
      onSuccess: getTableSchemaReqParams?.onSuccess,
      onError: getTableSchemaReqParams?.onError,
    }
  );

  return (
    <>
      {isLoading && (
        <section
          css={css`
            position: relative;
          `}
        >
          <Loading
            style={{
              zIndex: loadingZIndex,
              display: 'flex',
              justifyContent: 'center',
              position: 'absolute',
              top: '30%',
              left: '50%',
            }}
          ></Loading>
          <ContentSkeleton
            style={{
              padding: 14,
              overflow: 'hidden',
              maxWidth: '100%',
              maxHeight: 140,
            }}
          ></ContentSkeleton>
        </section>
      )}
      {isError && <ErrorIllustrator desc="未找到表的Schema"></ErrorIllustrator>}
      {isSuccess && (
        <Form labelPosition="left" getFormApi={setDataFormApi}>
          {table && (
            <section
              css={css`
                position: relative;
              `}
            >
              <section
                css={css`
                  display: flex;
                  font-weight: bold;
                  width: 100%;
                  flex: 1;
                  margin-bottom: 28px;
                `}
              >
                <section
                  css={css`
                    flex: 1;
                    text-align: center;
                  `}
                >
                  {`字段名称`}
                </section>
                <section
                  css={css`
                    flex: 1;
                    text-align: center;
                  `}
                >
                  {`字段类型`}
                </section>
                <section
                  css={css`
                    flex: 1;
                    text-align: center;
                  `}
                >
                  {`字段归类`}
                </section>
              </section>
              <section
                css={css`
                  width: 100%;
                  max-height: 280px;
                  word-break: break-all;
                  overflow: auto;
                `}
              >
                {data?.schema?.map((item, index) => {
                  return (
                    <section
                      key={item?.name}
                      css={css`
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                      `}
                    >
                      <section
                        css={css`
                          flex: 1;
                          text-align: center;
                        `}
                      >
                        {`${item.name}`}
                      </section>
                      <section
                        css={css`
                          flex: 1;
                          text-align: center;
                        `}
                      >
                        {`${item.type}`}
                      </section>
                      <section
                        css={css`
                          flex: 1;
                          text-align: center;
                          .semi-form-field-error-message {
                            justify-content: center;
                          }
                        `}
                      >
                        <Form.RadioGroup
                          rules={[
                            {
                              required: true,
                              message: '请指定该字段是维度或是指标',
                            },
                          ]}
                          type="radio"
                          noLabel
                          field={item.name}
                        >
                          <Radio
                            value="dimension"
                            style={{
                              marginRight: 48,
                            }}
                          >
                            维度
                          </Radio>
                          <Radio value="matrix">指标</Radio>
                        </Form.RadioGroup>
                      </section>
                    </section>
                  );
                })}
              </section>
            </section>
          )}
        </Form>
      )}
    </>
  );
};

export default TableAttrCollapse;
