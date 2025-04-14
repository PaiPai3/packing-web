// src/routes/index.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CargoManage from '../pages/CargoManage';
import DestManage from '../pages/DestManage'; // 假设已经创建
import BoxManage from '../pages/BoxManage'; // 假设已经创建
import PlanGenerate from '../pages/PlanGenerate'; // 假设已经创建
// import Settings from '../pages/Settings'; // 假设已经创建

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/cargo" element={<CargoManage />} />
      <Route path="/dest" element={<DestManage />} />
      <Route path="/box" element={<BoxManage />} />
      <Route path="/plan" element={<PlanGenerate />} />
      {/*<Route path="/settings" element={<Settings />} />*/}
    </Routes>
  );
};

export default AppRoutes;
