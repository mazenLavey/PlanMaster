"use client";

import { useContext } from "react";
import { PlansContext } from "@/contexts/PlansContext";
import CurrentPlan from "./CurrentPlan";
import styles from "@/styles/PlanConstructor.module.scss";
import Image from "next/image";

const PlanConstructor: React.FC = ()=>{
    const {currentPlan} = useContext(PlansContext);
    return (
        <>
        {
            currentPlan? 
            <CurrentPlan currentPlanData={currentPlan} />
            :
            <div className={styles.empty}>
                <div className={styles.box}>
                    No Plans
                </div>
                <div className={styles.imgContainer}>
                    <Image src="/assets/no_plans.webp" alt="task management" fill={true} placeholder="empty" priority={true}/>
                </div>
            </div>
        }
        </>
    );
};

export default PlanConstructor;