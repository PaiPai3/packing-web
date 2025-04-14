// src/pages/CargoManage.tsx
import React, {useEffect, useState} from 'react';
import CommonTable from '../components/CommonTable';
import {message, Modal} from 'antd';
import {
    getCargos,
    createCargo,
    updateCargo,
    deleteCargos,
} from '../services/cargoServices';

const CargoManage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    // 列定义（根据实际字段调整）
    const columns = [
        {title: '编号', dataIndex: 'id', key: 'id'},
        {title: '重量(kg)', dataIndex: 'weight', key: 'weight'},
        {title: '长(m)', dataIndex: 'length', key: 'length'},
        {title: '宽(m)', dataIndex: 'width', key: 'width'},
        {title: '高(m)', dataIndex: 'height', key: 'height'},
        {title: '目的地ID', dataIndex: 'destId', key: 'destId'}
    ];

    // 初始化加载数据
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const cargos = await getCargos();
            setData(cargos);
        } catch (error) {
            message.error('数据加载失败');
        } finally {
            setLoading(false);
        }
    };

    // 处理表格行选择
    const handleRowSelect = (selectedKeys: React.Key[]) => {
        setSelectedRowKeys(selectedKeys);
    };

    // 处理表单提交（添加/修改）
    const handleSubmit = async (values: any, editingId?: string) => {
        try {
            if (editingId) {
                await updateCargo(editingId, values);
                message.success('修改成功');
            } else {
                await createCargo(values);
                message.success('添加成功');
            }
            fetchData(); // 刷新数据
            return true;
        } catch (error) {
            message.error('操作失败');
            return false;
        }
    };

    // 处理批量删除
    const handleBatchDelete = async () => {
        if (selectedRowKeys.length === 0) {
            message.warning('请选择要删除的项目');
            return;
        }


        Modal.confirm({
            title: '确认删除',
            content: `确定要删除选中的 ${selectedRowKeys.length} 项吗？`,
            onOk: async () => {
                try {
                    await deleteCargos(selectedRowKeys as string[]);
                    message.success('删除成功');
                    fetchData();
                    setSelectedRowKeys([]);
                } catch (error) {
                    message.error('删除失败');
                }
            },
        });

    };

    return (
        <div className="table-container">
            <CommonTable
                columns={columns}
                data={data}
                loading={loading}
                onRowSelect={handleRowSelect}
                onSubmit={handleSubmit}
                onBatchDelete={handleBatchDelete}
            />
        </div>
    );
};

export default CargoManage;
