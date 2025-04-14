
// src/pages/PlanGenerate.tsx
import React from 'react';
import PlanTable from '../components/PlanTable';
import { planService } from '../services/planServices';

const PlanGenerate: React.FC = () => {
  return (
    <div className="page-container">
      {/*<h1>装箱方案生成</h1>*/}
      <PlanTable
        fetchDestinations={planService.fetchDestinations}
        fetchCargos={planService.fetchCargos}
        submitCalculation={planService.submitCalculation}
        savePlan={planService.savePlan}
        loadHistory={planService.loadHistory}
      />
    </div>
  );
};

export default PlanGenerate;
