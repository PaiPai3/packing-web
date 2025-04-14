// src/components/Topbar/Topbar.tsx
import React from 'react';
import { Space, Avatar } from 'antd';
import '../styles/Topbar.css'; // 引入 Topbar.css

const Topbar: React.FC = () => {
  return (
    <div className="topbar"> {/* 使用 topbar 类名 */}
      <Space>
        {/* 左侧内容 */}
      </Space>
      <Space style={{ float: 'right' }}>
        {/*<Avatar size={32} src="https://joeschmoe.io/api/v1/random" />*/}
      </Space>
    </div>
  );
};

export default Topbar;
