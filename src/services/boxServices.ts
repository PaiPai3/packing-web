// src/services/boxService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/box'; // 替换为实际API地址

export interface Box {
    id: string;
    name: string;      // 名称
    description: string; // 描述（原有字段）
    density: number;   // 密度（新增字段）
    thickness: number; // 厚度（新增字段）
}


// 获取箱子列表
export const getBoxes = async (): Promise<Box[]> => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data.data.map((item: any) => ({
            ...item,
            key: item.id // AntD Table需要key字段
        }));
    } catch (error) {
        throw new Error('获取箱子列表失败');
    }
};

// 创建箱子
export const createBox = async (boxData: Omit<Box, 'id'>): Promise<Box> => {
    try {
        const response = await axios.post(API_BASE_URL, boxData);
        return response.data;
    } catch (error) {
        throw new Error('创建箱子失败');
    }
};

// 更新箱子
export const updateBox = async (id: string, boxData: Partial<Box>): Promise<Box> => {
    try {
        const mergedData = {...boxData, id};
        const response = await axios.put(API_BASE_URL, mergedData);
        return response.data.data;
    } catch (error) {
        throw new Error('更新箱子失败');
    }
};


// 批量删除箱子
export const deleteBoxes = async (ids: string[]): Promise<void> => {
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
