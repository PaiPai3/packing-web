// src/components/TableControls/TableControls.tsx
import React from 'react';
import { Button } from 'antd';

interface TableControlsProps {
    onAdd: () => void;
    onDelete: () => void;
}

const TableControls: React.FC<TableControlsProps> = ({ onAdd, onDelete }) => {
    return (
        <div style={{ marginBottom: 16 }}>
            <Button  onClick={onAdd}>
                +添加
            </Button>
            <Button  style={{ marginLeft: 8, color:"red" }} onClick={onDelete}>
                -批量删除
            </Button>
        </div>
    );
};

export default TableControls;
