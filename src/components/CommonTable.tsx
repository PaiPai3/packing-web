// src/components/CommonTable/CommonTable.tsx
import React, {useState} from 'react';
import {Table, Modal, Form, Input, message, Popconfirm} from 'antd';
import TableControls from './TableControls';
import Pagination from './Pagination';
import '../styles/CommonTable.css'; // 引入 CommonTable.css

// src/components/CommonTable.tsx（部分修改）
interface CommonTableProps {
    columns: any[];
    data: any[];
    loading?: boolean;
    onRowSelect: (selectedKeys: React.Key[]) => void;
    onSubmit: (values: any, editingId?: string) => Promise<boolean>;
    onBatchDelete: () => void;
}

const CommonTable: React.FC<CommonTableProps> = ({
                                                     columns,
                                                     data,
                                                     loading,
                                                     onRowSelect,
                                                     onSubmit,
                                                     onBatchDelete
                                                 }) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [editingRowKey, setEditingRowKey] = useState<React.Key | null>(null);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
        onRowSelect(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleDelete = (record: any) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除 ${record.key} 吗？`,
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                // 这里可以添加删除逻辑
                alert("删除")
                // 假设 data 是一个状态，需要更新 data
                // setData(data.filter(item => item.key !== record.key));
            },
            onCancel() {
                alert("取消删除")
            },
        });
    };

    const handleAdd = () => {
        form.resetFields(); // 重置表单字段
        setEditingRowKey(null);
        setIsModalOpen(true);
    };

    const handleEdit = (record: any) => {
        setEditingRowKey(record.key);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    // 修改handleOk方法
    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const success = await onSubmit(values, editingRowKey?.toString());
            if (success) {
                setIsModalOpen(false);
                setEditingRowKey(null);
            }
        } catch (error) {
            console.log('Validate Failed:', error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingRowKey(null);
    };

    const newColumns = [
        ...columns,
        {
            title: '操作',
            key: 'action',
            render: (text: any, record: any) => (
                <span>
          <span onClick={() => handleEdit(record)} style={{color: '#3d99ff', cursor: 'pointer'}}>修改</span>
          <span style={{margin: '0 8px'}}>|</span>
          <Popconfirm title="确认删除" onConfirm={() => handleDelete(record)} okText="删除" cancelText="取消">
            <span style={{color: '#ff4d4f', cursor: 'pointer'}}>删除</span>
          </Popconfirm>
        </span>
            ),
        },
    ];

    return (
        <div className="common-table-container"> {/* 使用 common-table-container 类名 */}
            <div className="common-table-controls"> {/* 使用 common-table-controls 类名 */}
                <TableControls onAdd={handleAdd} onDelete={onBatchDelete}/>
            </div>
            <Table
                loading={loading}
                className="common-table"
                rowSelection={rowSelection}
                columns={newColumns}
                dataSource={data}
                pagination={false}
            />
            {/*<div className="common-pagination"> /!* 使用 common-pagination 类名 *!/*/}
            {/*    <Pagination/>*/}
            {/*</div>*/}
            <Modal title={`${editingRowKey ? '编辑' : '添加'}条目`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    {columns.map((col: any) => (
                        <Form.Item key={col.key} name={col.key} label={col.title}
                                   rules={[{required: true, message: `${col.title} 是必填项`}]}>
                            <Input/>
                        </Form.Item>
                    ))}
                </Form>
            </Modal>
        </div>
    );
};

export default CommonTable;
