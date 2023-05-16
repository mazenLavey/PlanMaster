"use client";

import { useContext } from "react";
import { PlansContext } from "@/contexts/PlansContext";
import CurrentPlan from "@/app/dashboard/CurrentPlan";
import styles from "@/styles/PlanConstructor.module.scss";

const PlanConstructor: React.FC = ()=>{
    const {currentPlan} = useContext(PlansContext);
    return (
        <>
        {
            currentPlan? 
            <CurrentPlan currentPlanData={currentPlan} />
            :
            <div className={styles.emptyBox}>
                No Plans
            </div>
        }
        </>
    );
};

export default PlanConstructor;