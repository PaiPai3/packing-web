// src/components/PlanTable.tsx
import React, {useState, useEffect} from 'react';
import {Table, Modal, Form, Select, Input, Button} from 'antd';
import TableControls from './TableControls';
import '../styles/PlanTable.css';


export interface PackingPlanItem {
    id: string;
    destId: string;
    cargoId: string;
    quantity: number;
}

// interface HistoryPlan {
//     id: string;
//     data: PackingPlanItem[];
// }

interface PlanTableProps {
    // 接口方法
    fetchDestinations: () => Promise<string[]>;
    fetchCargos: (destination: string) => Promise<string[]>;
    submitCalculation: (data: PackingPlanItem[]) => Promise<void>;
    savePlan: (data: PackingPlanItem[]) => Promise<void>;
    loadHistory: () => Promise<PackingPlanItem[]>;
}

const PlanTable: React.FC<PlanTableProps> = ({
                                                 fetchDestinations,
                                                 fetchCargos,
                                                 submitCalculation,
                                                 savePlan,
                                                 loadHistory,
                                             }) => {


    const initialData: PackingPlanItem[] = [
        // {
        //     id: '1',
        //     destId: '1_澳洲',
        //     cargoId: '111',
        //     quantity: 2,
        // },
        // {
        //     id: '2',
        //     destId: '2_美国',
        //     cargoId: '222',
        //     quantity: 7,
        // },
        // {
        //     id: '3',
        //     destId: '4_德国',
        //     cargoId: '444',
        //     quantity: 9,
        // },
    ];

    const [data, setData] = useState<PackingPlanItem[]>(initialData);
    const [dests, setDests] = useState<string[]>([]);
    const [cargos, setCargos] = useState<string[]>([]);
    const [historyPlans, setHistoryPlans] = useState<PackingPlanItem[]>([]);
    const [selectedHistory, setSelectedHistory] = useState<string>();
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false); // 新增：控制弹窗显示状态
    const [resultData, setResultData] = useState<string>('');
    const [isResultModalVisible, setIsResultModalVisible] = useState(false);


    // 初始化加载目的地和历史记录
    useEffect(() => {
        const init = async () => {
            const dests = await fetchDestinations();
            setDests(dests);
            const history = await loadHistory();
            setHistoryPlans([history]);
        };
        init();
    }, []);

    // 目的地选择变化时加载标准件
    const handleDestinationChange = async (value: string) => {
        const cargos = await fetchCargos(value);
        setCargos(cargos);
        form.setFieldsValue({cargoId: undefined});
    };

    // 本地操作方法
    const handleAdd = () => {
        form.resetFields();
        setEditingId(null);
        setIsModalVisible(true); // 新增：显示弹窗
    };

    const handleDelete = (id: string) => {
        setData(data.filter((item) => item.id !== id));
    };

    const handleBatchDelete = () => {
        setData(data.filter((item) => !selectedRowKeys.includes(item.id)));
        setSelectedRowKeys([]);
    };

    // 表单提交
    const onFinish = (values: any) => {
        const newItem = {
            id: editingId || Date.now().toString(),
            ...values,
        };

        setData((prev) =>
            editingId
                ? prev.map((item) => (item.id === editingId ? newItem : item))
                : [...prev, newItem]
        );

        setIsModalVisible(false); // 新增：关闭弹窗
        setEditingId(null);
    };

    // 表格列定义
    const columns = [
        {title: '目的地', dataIndex: 'destination', key: 'destination'},
        {title: '标准件编号', dataIndex: 'cargoId', key: 'cargoId'},
        {title: '数量', dataIndex: 'quantity', key: 'quantity'},
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: PackingPlanItem) => (
                <>
                    <Button
                        type="link"
                        onClick={() => {
                            form.setFieldsValue(record);
                            setEditingId(record.id);
                            setIsModalVisible(true); // 新增：编辑时显示弹窗
                        }}
                    >
                        编辑
                    </Button>
                    <Button type="link" danger onClick={() => handleDelete(record.id)}>
                        删除
                    </Button>
                </>
            ),
        },
    ];


    const handleCalculate = async () => {
        try {
            const result:string = await submitCalculation(data);
            console.log("Calculate result:", result);

            setResultData(result); // 设置 resultData 状态
            setIsResultModalVisible(true); // 显示结果模态框
        } catch (error) {
            console.error('提交计算失败:', error);
        }
    };



    return (
        <div className="plantable-container">
            <div className="toolbar">
                <Select
                    style={{width: 200}}
                    placeholder="选择历史方案"
                    onChange={(value) => setData(historyPlans.find((p) => p.id === value) || [])}
                    options={historyPlans.map((p, i) => ({
                        label: `方案 ${i + 1}`,
                        value: p.id,
                    }))}
                />

                <TableControls onAdd={handleAdd} onDelete={handleBatchDelete}/>

                <Button type="primary" onClick={handleCalculate}>
                    提交计算
                </Button>

                <Button onClick={() => savePlan(data)}>保存方案</Button>
            </div>

            <Form form={form} onFinish={onFinish}>
                <Modal
                    title={editingId ? '编辑条目' : '新增条目'}
                    open={isModalVisible} // 修改为使用新状态
                    // open={true} // 修改为使用新状态
                    onOk={() => form.submit()}
                    onCancel={() => {
                        setIsModalVisible(false); // 新增：取消时关闭弹窗
                        setEditingId(null);
                    }}
                    destroyOnClose // 新增：关闭时销毁表单内容
                >
                    <Form.Item
                        name="destination"
                        label="目的地"
                        rules={[{required: true, message: '请选择目的地'}]}
                    >
                        <Select
                            options={dests.map((d) => ({label: d, value: d}))}
                            onChange={handleDestinationChange}
                        />
                    </Form.Item>

                    <Form.Item
                        name="cargoId"
                        label="标准件"
                        rules={[{required: true, message: '请选择标准件'}]}
                    >
                        <Select options={cargos.map((p) => ({label: p, value: p}))}/>
                    </Form.Item>

                    <Form.Item
                        name="quantity"
                        label="数量"
                        rules={[
                            {required: true, message: '请输入数量'},
                            {min: 1, message: '数量必须大于零'},
                        ]}
                    >
                        <Input type="number"/>
                    </Form.Item>
                </Modal>
            </Form>

            <Table
                rowKey="id"
                columns={columns}
                dataSource={data}
                rowSelection={{
                    selectedRowKeys,
                    onChange: setSelectedRowKeys,
                }}
                pagination={false}
            />

            <Modal
                title="计算结果"
                open={isResultModalVisible}
                onCancel={() => setIsResultModalVisible(false)}
                footer={null} // 移除默认的按钮
            >
                <pre>{resultData}</pre>
            </Modal>

        </div>
    );
};

export default PlanTable;
