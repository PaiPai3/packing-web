import axios from 'axios';
import {getDests} from "./destServices";
import {getCargos} from "./cargoServices";
import {PackingPlanItem} from "../components/PlanTable";

const API_BASE = 'http://localhost:8080/api/packing'; // 替换为实际API地址


export interface PackingPlan {
    id: string;
    createTime: string;
    items: PackingPlanItem[];
}

export const planService = {
    // 获取所有目的地
    fetchDestinations: async (): Promise<string[]> => {
        try {
            const dests = await getDests();
            // return dests.map(dest => dest.id); // 提取 name 字段
            return dests.map(dest => dest.id + "_" + dest.name); // 提取 name 字段
        } catch (error) {
            console.error('获取目的地失败:', error);
            return []; // 返回空数组或处理错误
        }
    },

    // 根据目的地获取标准件
    fetchCargos: async (destination: string): Promise<string[]> => {
        try {
            const cargos = await getCargos();
            const id: string = destination.split('_')[0];

            return cargos
                .filter(cargo => cargo.destId.toString() === id)
                .map(cargo => cargo.id); // 提取 name 字段
        } catch (error) {
            console.error('获取标准件失败:', error);
            return []; // 返回空数组或处理错误
        }
    },

    // 提交计算
    submitCalculation: async (data: any[]): Promise<void> => {

        console.log("submitCalculation:", data);

        const updatedData = data.map(item => ({
            ...item,
            destId: item.destination.split('_')[0] // 更新 destId 为分割后的第一个字符串
        }));

        const packingPlan: PackingPlan = {
            id: '',
            createTime: new Date().toISOString(),
            items: updatedData
        };

        try {
            const response = await axios.post(`${API_BASE}/calculate`, packingPlan);
            return response.data.data; // 返回后端的计算结果
        } catch (error) {
            console.error('提交计算失败:', error);
            throw new Error('提交计算失败');
        }
    },

    // 保存方案
    savePlan: async (data: any[]): Promise<void> => {
        await axios.post(`${API_BASE}/save`, data);
    },

    // 加载历史方案
    loadHistory: async (): Promise<any[]> => {
        const res = await axios.get(`${API_BASE}/history`);
        return res.data;
    }
};
