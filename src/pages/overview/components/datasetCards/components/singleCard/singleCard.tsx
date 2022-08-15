import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Button, Card, Descriptions, message, Modal } from 'antd';
import { COLOR_PALETTE } from '@const/theme/color';
import SelectTableModal from './components/selectTableModal';
import { IconAlertCircle, IconDelete } from '@douyinfe/semi-icons';
import { useSetRecoilState } from 'recoil';
import { overviewState } from '@stores/overview';
import { useDeleteDataSet } from '@/api';
import { useNavigate } from 'react-router';

const { useRef, useState, useEffect, useMemo } = React;

const Container = styled.section`
  .ant-card {
    cursor: pointer;

    .delete-button {
      visibility: hidden;
      .semi-icon-delete {
        color: ${COLOR_PALETTE.SORAME_HEADER_SEARCH_BG_HOVER};
        :hover {
          color: ${COLOR_PALETTE.SORAME_RED}!important;
        }
      }
    }

    :hover {
      .delete-button {
        visibility: visible;
        .semi-icon-delete {
          color: ${COLOR_PALETTE.SORAME_HEADER_SEARCH_BG_HOVER};
          :hover {
            color: ${COLOR_PALETTE.SORAME_RED}!important;
          }
        }
      }
    }

    .ant-card-body {
      overflow-y: auto !important;
    }
  }
`;

const cardStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  marginTop: '24px',
  wordBreak: 'break-all',
  background: COLOR_PALETTE.SORAME_WHITE,
  borderRadius: '8px',
};
interface SingleCardProps {
  datasetInfo?: API.DataSetList[];
  isLoading: boolean;
}

const SingleCard: React.FC<SingleCardProps> = (props: SingleCardProps) => {
  const { datasetInfo, isLoading } = props;

  const navigate = useNavigate();

  const handleCardClick = React.useCallback(
    (datasetId: string, selectedTableId: string) => {
      if (typeof datasetId !== 'string' || datasetId === '') {
        message.error('数据集id不合法');
        return;
      }
      if (typeof selectedTableId !== 'string' || selectedTableId === '') {
        message.error('数据表id不合法');
        return;
      }
      navigate(`/dataset/${datasetId}/datasetTable/${selectedTableId}`);
    },
    []
  );

  const setOverviewState = useSetRecoilState(overviewState);

  const handleDeleteBtnClick = React.useCallback(
    (e => {
      e.preventDefault();
      e.stopPropagation();
      Modal.confirm({
        title: (
          <section
            css={css`
              display: flex;
              align-items: center;
              margin-bottom: 14px;
            `}
          >
            <IconAlertCircle
              size="extra-large"
              style={{
                color: COLOR_PALETTE.SORAME_RED,
                display: 'inline-block',
              }}
            />
            <span style={{ marginLeft: '8px' }}>确认删除该数据集？</span>
          </section>
        ),
        content: '注意：删除后不可恢复。',
        okText: '确认',
        cancelText: '取消',
        icon: false,
        onOk: () => {
          deleteDataSetMutation.mutateAsync({
            id: datasetInfo?.[0]?.id || '',
          });
        },
      });
    }) as React.MouseEventHandler<HTMLSpanElement>,
    []
  );

  /** mutation */
  const deleteDataSetMutation = useDeleteDataSet({
    onError: (e: API.ErrorResp) => {
      message.error(
        `数据集删除失败，错误信息：${e?.response?.data?.error || e?.message}`
      );
    },
    onSuccess: () => {
      message.success('🎉 数据集删除成功 🥰 ');
      setOverviewState(prevState => ({
        ...prevState,
        needRefresh: true,
      }));
    },
  });

  return (
    <Container>
      <SelectTableModal
        modalProps={{
          title: `选择数据集「${datasetInfo?.[0]?.name || ''}」下的数据表`,
          okText: '查看',
        }}
        dataInfo={datasetInfo}
        buttonElement={
          <Card
            hoverable={true}
            style={cardStyle}
            title={
              <section
                css={css`
                  display: flex;
                `}
              >
                <section
                  css={css`
                    flex: 1;
                  `}
                >
                  {datasetInfo?.[0]?.name || ''}
                </section>
                <section className="delete-button" css={css``}>
                  <IconDelete
                    onClick={handleDeleteBtnClick}
                    style={{
                      cursor: 'pointer',
                    }}
                  />
                </section>
              </section>
            }
            loading={isLoading}
          >
            <Descriptions column={1}>
              <Descriptions.Item label="描述">
                {datasetInfo?.[0]?.descr || ''}
              </Descriptions.Item>
              <Descriptions.Item label="创建者">
                {datasetInfo?.[0]?.createUser || 'admin'}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        }
        afterSubmitCallback={handleCardClick}
      />
    </Container>
  );
};

export default SingleCard;
