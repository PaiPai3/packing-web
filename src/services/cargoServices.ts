// src/services/cargoServices.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/cargo'; // 替换为实际API地址

export interface Cargo {
    id: string;
    weight: number;     // 重量
    description: string; // 描述（原有字段）
    length: number;     // 长
    width: number;      // 宽
    height: number;     // 高
    destId: string;
}

// 获取货物列表
export const getCargos = async (): Promise<Cargo[]> => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data.data.map((item: any) => ({
            ...item,
            key: item.id, // AntD Table需要key字段
        }));
    } catch (error) {
        throw new Error('获取货物列表失败');
    }
};

// 创建货物
export const createCargo = async (cargoData: Omit<Cargo, 'id'>): Promise<Cargo> => {
    try {
        const response = await axios.post(API_BASE_URL, cargoData);
        return response.data;
    } catch (error) {
        throw new Error('创建货物失败');
    }
};

// 更新货物
export const updateCargo = async (id: string, cargoData: Partial<Cargo>): Promise<Cargo> => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, cargoData);
        return response.data;
    } catch (error) {
        throw new Error('更新货物失败');
    }
};

// 批量删除货物
export const deleteCargos = async (ids: string[]): Promise<void> => {
    try {
        console.log(ids);
        // 使用 params 选项传递 ids
        await axios.delete(API_BASE_URL, {
            params: {
                ids: ids.join(',') // 将数组转换为逗号分隔的字符串
            }
        });
    } catch (error) {
        throw new Error('批量删除失败');
    }
};
