import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Form, Select, Slider, Switch, Typography } from 'antd';
import { dataTableState } from '@stores/dataTable';
import { useRecoilState } from 'recoil';
import { FieldData } from '..';
import { useForm } from 'antd/lib/form/Form';

const { useRef, useState, useEffect, useMemo } = React;

interface AreaChartCustomStyleProps {}

const AreaChartCustomStyle: React.FC<AreaChartCustomStyleProps> = (
  props: AreaChartCustomStyleProps
) => {
  const {} = props;

  const [
    { areaChartVisualizationSettings, fieldListDimensionList },
    setDataTableState,
  ] = useRecoilState(dataTableState);

  const formattedAreaChartVisualizationSettings = {
    ...areaChartVisualizationSettings,
    indexBy: areaChartVisualizationSettings.indexBy
      ? areaChartVisualizationSettings.indexBy
      : fieldListDimensionList?.[0]?.name || '',
  };

  const syncAreaChartSettings = (allFields: FieldData[]) => {
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
        areaChartVisualizationSettings: {
          ...prevState.areaChartVisualizationSettings,
          ...mergedSettings,
        },
      };
    });
  };

  const [form] = useForm();

  useEffect(() => {
    const formattedAreaChartVisualizationSettings = {
      ...areaChartVisualizationSettings,
      indexBy: areaChartVisualizationSettings.indexBy
        ? areaChartVisualizationSettings.indexBy
        : fieldListDimensionList?.[0]?.name || '',
    };
    (
      form as unknown as { setFieldsValue: (val: unknown) => unknown }
    )?.setFieldsValue?.(formattedAreaChartVisualizationSettings);
  }, []);

  return (
    <>
      <Typography.Title level={5}>客制化面积图</Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFieldsChange={(_: FieldData, allFields: FieldData[]) => {
          syncAreaChartSettings(allFields);
        }}
        initialValues={formattedAreaChartVisualizationSettings}
      >
        <Form.Item label="横轴字段" name="indexBy">
          <Select>
            {fieldListDimensionList?.map(field => {
              return <Select.Option key={field.name} value={field.name} />;
            })}
          </Select>
        </Form.Item>
        <Form.Item name="height" label="高度">
          <Slider min={0} max={2000} />
        </Form.Item>
        <Form.Item name="width" label="宽度">
          <Slider min={0} max={2000} />
        </Form.Item>
        <Form.Item
          label="是否显示标签"
          name="enablePointLabel"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="是否显示图例"
          name="hasLegends"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item label="线形" name="curve">
          <Select>
            <Select.Option value="linear">线性</Select.Option>
            <Select.Option value="basis">基本</Select.Option>
            <Select.Option value="cardinal">基数</Select.Option>
            <Select.Option value="catmullRom">catmullRom</Select.Option>
            <Select.Option value="monotoneX">X 单调</Select.Option>
            <Select.Option value="monotoneY">Y 单调</Select.Option>
            <Select.Option value="natural">自然</Select.Option>
            <Select.Option value="step">步进</Select.Option>
            <Select.Option value="stepAfter">后步进</Select.Option>
            <Select.Option value="stepBefore">前步进</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="lineWidth" label="线宽">
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

export default AreaChartCustomStyle;
