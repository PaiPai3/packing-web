// src/components/Pagination/Pagination.tsx
import React from 'react';
import { Pagination as AntdPagination } from 'antd';

const Pagination: React.FC = () => {
  return (
    <AntdPagination
      total={50}
      showSizeChanger
      pageSizeOptions={['5', '10', '20']}
      showQuickJumper
      showTotal={(total) => `共 ${total} 条`}
    />
  );
};

export default Pagination;
