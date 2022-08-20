import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Form, Radio, Switch, Typography } from 'antd';
import { FieldData } from '..';
import { dataTableState } from '@/stores/dataTable';
import { useRecoilState, useRecoilValue } from 'recoil';

const { useForm } = Form;

const { useRef, useState, useEffect, useMemo } = React;

interface TableCustomStyleProps {}

const EDGE_DISTANCE = 14;

const Container = styled.section`
  padding: ${EDGE_DISTANCE}px;
`;

const TableCustomStyle: React.FC<TableCustomStyleProps> = (
  props: TableCustomStyleProps
) => {
  const {} = props;

  const [{ tableVisualizationSettings }, setDataTableState] =
    useRecoilState(dataTableState);

  const syncTableSettings = (allFields: FieldData[]) => {
    const mergedSettings =
      allFields.reduce((acc, cur) => {
        if (Array.isArray(cur.name)) {
          const key = cur.name?.[0] || '';
          if (key) {
            return {
              ...acc,
              [key]: cur.value,
            };
          } else {
            return acc;
          }
        } else {
          return {
            ...acc,
            [cur.name as string | number]: cur.value,
          };
        }
      }, {}) || {};
    setDataTableState(prevState => {
      return {
        ...prevState,
        tableVisualizationSettings: {
          ...prevState.tableVisualizationSettings,
          ...mergedSettings,
        },
      };
    });
  };

  const [form] = useForm();

  useEffect(() => {
    (
      form as unknown as { setFieldsValue: (val: unknown) => unknown }
    )?.setFieldsValue?.(tableVisualizationSettings || {});
  }, []);

  return (
    <Container>
      <Typography.Title level={5}>表格样式</Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFieldsChange={(_: FieldData, allFields: FieldData[]) => {
          syncTableSettings(allFields);
        }}
        initialValues={tableVisualizationSettings || {}}
      >
        <Form.Item
          label="是否展示外边框和表格边框"
          name="bordered"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="是否开启伸缩列功能"
          name="resizable"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="是否显示表头"
          name="showHeader"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item label="表格尺寸" name="size">
          <Radio.Group>
            <Radio.Button value="default">默认</Radio.Button>
            <Radio.Button value="middle">中</Radio.Button>
            <Radio.Button value="small">小</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default TableCustomStyle;
