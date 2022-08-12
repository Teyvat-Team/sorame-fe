import * as React from 'react';
import { Button, Modal, Form, Select, Descriptions, message } from 'antd';
import { IconPlus } from '@douyinfe/semi-icons';
import { useGetDataSource } from '@/api';

const { useForm } = Form;

interface NewDataSetModalProps {
  buttonElement?: React.ReactNode;
  clickKey?: string;
  initValue?: any;
  afterSubmitCallback?(datasourceName: string): void;
  modalProps?: React.ComponentProps<typeof Modal>;
}

const ButtonDefaultElement: React.ReactNode = (
  <Button icon={<IconPlus />} type="primary">
    添加业务
  </Button>
);

const NewDataSetModal: React.FC<NewDataSetModalProps> = props => {
  const {
    buttonElement,
    clickKey,
    initValue,
    afterSubmitCallback,
    modalProps,
  } = props;

  const [modalShow, setModalShow] = React.useState(false);
  const [form] = useForm();
  const onCancel = React.useCallback(() => {
    setModalShow(false);
  }, [setModalShow]);

  const handleClick = React.useCallback(async () => {
    setModalShow(true);
  }, [setModalShow]);

  const addKeyProps = clickKey || 'onClick';
  const element = React.cloneElement(
    (buttonElement || ButtonDefaultElement) as any,
    {
      [addKeyProps]: handleClick,
    }
  );

  const onOk = React.useCallback(async () => {
    // 校验数据，发送请求
    (form as any as { validateFields: () => Promise<any> })
      ?.validateFields?.()
      .then((values: { datasource: string }) => {
        console.log('data: ', values);
        return values;
      })
      .then(values => {
        afterSubmitCallback?.(values.datasource);
        onCancel();
      })
      .catch((err: any) => {
        // console.log(err);
      });
  }, [afterSubmitCallback, onCancel]);

  const [getDataSourceReqParams, setGetDataSourceReqParams] = React.useState({
    enableRequest: true,
    onSuccess: () => {
      setGetDataSourceReqParams({
        ...getDataSourceReqParams,
        enableRequest: false,
      });
    },
    onError: (err: API.ErrorResp) => {
      message.error(
        `未找到数据源，错误信息：${
          err?.response?.data?.error || err?.message || '未知错误'
        }`
      );
      setGetDataSourceReqParams({
        ...getDataSourceReqParams,
        enableRequest: false,
      });
    },
  });

  const { isLoading, isSuccess, isError, data, error } = useGetDataSource({
    enabled: getDataSourceReqParams?.enableRequest,
    retry: false,
    cacheTime: 1000 * 60, //  1min
    onSuccess: getDataSourceReqParams?.onSuccess,
    onError: getDataSourceReqParams?.onError,
  });

  return (
    <>
      {element}
      <Modal
        visible={modalShow}
        closable={true}
        maskClosable={false}
        okText="确定"
        onCancel={onCancel}
        width={520}
        onOk={onOk}
        {...modalProps}
      >
        <Form initValues={initValue} form={form} layout="vertical">
          <Form.Item
            name="datasource"
            label="选择数据源"
            rules={[{ required: true }]}
          >
            <Select
              loading={isLoading}
              placeholder="选择需添加的数据源"
              allowClear
              onChange={(id: string) => {}}
            >
              {data?.data?.map(i => (
                <Select.Option
                  key={i?.dataSourceName || ''}
                  value={i?.dataSourceName || ''}
                  labelInValue={true}
                >
                  {i?.dataSourceName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NewDataSetModal;
