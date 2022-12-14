import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Form, Select, Slider, Switch, Typography } from 'antd';
import { dataTableState } from '@stores/dataTable';
import { useRecoilState } from 'recoil';
import { FieldData } from '..';
import { useForm } from 'antd/lib/form/Form';

const { useRef, useState, useEffect, useMemo } = React;

interface LineChartCustomStyleProps {}

const LineChartCustomStyle: React.FC<LineChartCustomStyleProps> = (
  props: LineChartCustomStyleProps
) => {
  const {} = props;

  const [
    { lineChartVisualizationSettings, fieldListDimensionList },
    setDataTableState,
  ] = useRecoilState(dataTableState);

  const formattedLineChartVisualizationSettings = {
    ...lineChartVisualizationSettings,
    indexBy: lineChartVisualizationSettings.indexBy
      ? lineChartVisualizationSettings.indexBy
      : fieldListDimensionList?.[0]?.name || '',
  };

  const syncLineChartSettings = (allFields: FieldData[]) => {
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
        lineChartVisualizationSettings: {
          ...prevState.lineChartVisualizationSettings,
          ...mergedSettings,
        },
      };
    });
  };

  const [form] = useForm();

  useEffect(() => {
    const formattedLineChartVisualizationSettings = {
      ...lineChartVisualizationSettings,
      indexBy: lineChartVisualizationSettings.indexBy
        ? lineChartVisualizationSettings.indexBy
        : fieldListDimensionList?.[0]?.name || '',
    };
    (
      form as unknown as { setFieldsValue: (val: unknown) => unknown }
    )?.setFieldsValue?.(formattedLineChartVisualizationSettings);
  }, []);

  return (
    <>
      <Typography.Title level={5}>??????????????????</Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFieldsChange={(_: FieldData, allFields: FieldData[]) => {
          syncLineChartSettings(allFields);
        }}
        initialValues={formattedLineChartVisualizationSettings}
      >
        <Form.Item label="????????????" name="indexBy">
          <Select>
            {fieldListDimensionList?.map(field => {
              return <Select.Option key={field.name} value={field.name} />;
            })}
          </Select>
        </Form.Item>
        <Form.Item name="height" label="??????">
          <Slider min={0} max={2000} />
        </Form.Item>
        <Form.Item name="width" label="??????">
          <Slider min={0} max={2000} />
        </Form.Item>
        <Form.Item
          label="??????????????????"
          name="enablePointLabel"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="??????????????????"
          name="hasLegends"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item label="??????" name="curve">
          <Select>
            <Select.Option value="linear">??????</Select.Option>
            <Select.Option value="basis">??????</Select.Option>
            <Select.Option value="cardinal">??????</Select.Option>
            <Select.Option value="catmullRom">catmullRom</Select.Option>
            <Select.Option value="monotoneX">X ??????</Select.Option>
            <Select.Option value="monotoneY">Y ??????</Select.Option>
            <Select.Option value="natural">??????</Select.Option>
            <Select.Option value="step">??????</Select.Option>
            <Select.Option value="stepAfter">?????????</Select.Option>
            <Select.Option value="stepBefore">?????????</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="lineWidth" label="??????">
          <Slider
            min={1}
            max={10}
            marks={{
              0: '0',
              5: '5',
              10: '10',
            }}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default LineChartCustomStyle;
