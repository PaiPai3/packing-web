// src/pages/BoxManage.tsx
import React, {useState, useEffect} from 'react';
import CommonTable from '../components/CommonTable';
import {getBoxes, createBox, updateBox, deleteBoxes, Box} from '../services/boxServices';
import {message} from 'antd';

const BoxManage: React.FC = () => {
    const [data, setData] = useState<Box[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    // 列定义
    const columns = [
        {title: '名称', dataIndex: 'name', key: 'name'},
        {title: '密度(kg/m2)', dataIndex: 'density', key: 'density'},
        {title: '厚度(m)', dataIndex: 'thickness', key: 'thickness'}
    ];

    // 初始化加载数据
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const boxes = await getBoxes();
            setData(boxes);
            console.log("box loaded");
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
                await updateBox(editingId, values);
                console.log("box editing ID:" + editingId)
                console.log("box values:" + values)
                message.success('修改成功');
            } else {
                await createBox(values);
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

        console.log("box selectedRowKeys:" + selectedRowKeys);
        console.log("selectedRowKeys.length" + selectedRowKeys.length);


        if (selectedRowKeys.length === 0) {
            message.warning('请选择要删除的项目');
            return;
        }

        try {
            await deleteBoxes(selectedRowKeys as string[]);
            message.success('删除成功');
            fetchData();
            setSelectedRowKeys([]);
        } catch (error) {
            message.error('删除失败');
        }

        // Modal.confirm({
        //     title: '确认删除',
        //     content: `确定要删除选中的 ${selectedRowKeys.length} 项吗？`,
        //     okText: '确认',
        //     cancelText: '取消',
        //     onOk: async () => {
        //         try {
        //             await deleteBoxes(selectedRowKeys as string[]);
        //             message.success('删除成功');
        //             fetchData();
        //             setSelectedRowKeys([]);
        //         } catch (error) {
        //             message.error('删除失败');
        //         }
        //     },
        //     onCancel() {
        //         message.info('已取消删除');
        //     },
        // });
    };

    return (

        <div className="table-container"> {/* 使用 table-container 类名 */}
            {/*<CommonTable columns={columns} data={data}/>*/}

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

export default BoxManage;
