// src/services/destServices.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/dest'; // 替换为实际API地址

export interface Dest {
    id: string;
    name: string;       // 名称

    weight: number;     // 最大重量
    length: number;     // 最大长
    width: number;      // 最大宽
    height: number;     // 最大高
}

// 获取目的地列表
export const getDests = async (): Promise<Dest[]> => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data.data.map((item: any) => ({
            ...item,
            key: item.id, // AntD Table需要key字段
        }));
    } catch (error) {
        throw new Error('获取目的地列表失败');
    }
};

// 创建目的地
export const createDest = async (destData: Omit<Dest, 'id'>): Promise<Dest> => {
    try {
        const response = await axios.post(API_BASE_URL, destData);
        return response.data;
    } catch (error) {
        throw new Error('创建目的地失败');
    }
};

// 更新目的地
export const updateDest = async (id: string, destData: Partial<Dest>): Promise<Dest> => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, destData);
        return response.data;
    } catch (error) {
        throw new Error('更新目的地失败');
    }
};

// 批量删除目的地
export const deleteDests = async (ids: string[]): Promise<void> => {
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
