"use client";

import { useContext } from "react";
import { PlansContext } from "@/contexts/PlansContext";
import CurrentPlan from "@/components/others/CurrentPlan";

const PlanConstructor: React.FC = ()=>{
    const {currentPlan} = useContext(PlansContext);

    return (
        <>{
            currentPlan? <CurrentPlan currentPlanData={currentPlan} />:
            <div>
                No Plans
            </div>
        }
        </>
    );
};

export default PlanConstructor;