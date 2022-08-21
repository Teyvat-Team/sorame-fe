import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Form, Select, Slider, Switch, Typography } from 'antd';
import { dataTableState } from '@stores/dataTable';
import { useRecoilState } from 'recoil';
import { FieldData } from '..';
import { useForm } from 'antd/lib/form/Form';

const { useRef, useState, useEffect, useMemo } = React;

interface PieChartCustomStyleProps {}

const PieChartCustomStyle: React.FC<PieChartCustomStyleProps> = (
  props: PieChartCustomStyleProps
) => {
  const {} = props;

  const [
    { pieChartVisualizationSettings, fieldListDimensionList },
    setDataTableState,
  ] = useRecoilState(dataTableState);

  const formattedPieChartVisualizationSettings = {
    ...pieChartVisualizationSettings,
    indexBy: pieChartVisualizationSettings.indexBy
      ? pieChartVisualizationSettings.indexBy
      : fieldListDimensionList?.[0]?.name || '',
  };

  const syncPieChartSettings = (allFields: FieldData[]) => {
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
        pieChartVisualizationSettings: {
          ...prevState.pieChartVisualizationSettings,
          ...mergedSettings,
        },
      };
    });
  };

  const [form] = useForm();

  useEffect(() => {
    const formattedPieChartVisualizationSettings = {
      ...pieChartVisualizationSettings,
      indexBy: pieChartVisualizationSettings.indexBy
        ? pieChartVisualizationSettings.indexBy
        : fieldListDimensionList?.[0]?.name || '',
    };
    (
      form as unknown as { setFieldsValue: (val: unknown) => unknown }
    )?.setFieldsValue?.(formattedPieChartVisualizationSettings);
  }, []);

  return (
    <>
      <Typography.Title level={5}>客制化饼图</Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFieldsChange={(_: FieldData, allFields: FieldData[]) => {
          syncPieChartSettings(allFields);
        }}
        initialValues={formattedPieChartVisualizationSettings}
      >
        <Form.Item label="维度选择" name="indexBy">
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
          label="是否显示图例"
          name="hasLegends"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </>
  );
};

export default PieChartCustomStyle;
