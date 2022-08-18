import * as React from 'react';
import { Button, Modal, Form, Select, Descriptions } from 'antd';
import { IconPlus } from '@douyinfe/semi-icons';

const { useForm } = Form;

interface SelectTableModalProps {
  buttonElement?: React.ReactNode;
  clickKey?: string;
  dataInfo?: API.DataSetList[] | undefined;
  initValue?: any;
  // 添加完成后的 callback，一般可以认为是刷新数据
  afterSubmitCallback?(datasetId: string, selectedTable: string): any;
  modalProps?: React.ComponentProps<typeof Modal>;
}

const ButtonDefaultElement: React.ReactNode = (
  <Button icon={<IconPlus />} type="primary">
    添加业务
  </Button>
);

const SelectTableModal: React.FC<SelectTableModalProps> = props => {
  const {
    buttonElement,
    clickKey,
    initValue,
    afterSubmitCallback,
    modalProps,
    dataInfo,
  } = props;

  const [modalShow, setModalShow] = React.useState(false);
  const [form] = useForm();
  const [selectedTable, setSelectedTable] = React.useState<string>('');
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
    (form as any as { validateFields: () => Promise<any> })
      ?.validateFields?.()
      .then((values: any) => {
        return values;
      })
      .then(data => {
        afterSubmitCallback?.(dataInfo?.[0]?.id, data?.selectedTable);
        onCancel();
      })
      .catch((err: any) => {
        // noop
      });
  }, [afterSubmitCallback, onCancel]);

  return (
    <>
      {element}
      <Modal
        visible={modalShow}
        closable={true}
        maskClosable={false}
        okText="保存"
        onCancel={onCancel}
        width={520}
        onOk={onOk}
        {...modalProps}
      >
        <Form initValues={initValue} form={form} layout="vertical">
          <Form.Item
            name="selectedTable"
            label="选择数据表"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="选择需要分析的数据表"
              allowClear
              onChange={(id: string) => {
                setSelectedTable(id);
              }}
            >
              {dataInfo?.map?.((item: API.DataSetList) => (
                <Select.Option
                  key={item?.tableId}
                  value={item?.tableId}
                  labelInValue={true}
                >
                  {item?.tableName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
        {selectedTable && (
          <Descriptions
            column={1}
            style={{
              marginTop: '12px',
              marginBottom: '12px',
            }}
          >
            <Descriptions.Item label="表 id">
              {dataInfo?.find(i => i.tableId === selectedTable)?.tableId || ''}
            </Descriptions.Item>
            <Descriptions.Item label="数据库名">
              {dataInfo?.find(i => i.tableId === selectedTable)?.dbName || ''}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default SelectTableModal;
