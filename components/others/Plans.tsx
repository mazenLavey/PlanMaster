"use client";

import { useContext, useRef } from "react";
import { PlansContext } from "@/contexts/PlansContext";
import PlanCard from "@/components/cards/PlanCard";
import styles from "@/styles/Plans.module.scss";
import AddNewPlan from "../buttons/AddNewPlan";

const Plans: React.FC = ()=>{
    const {allPlans, showPlan, deletePlan} = useContext(PlansContext);
    const planBoxRef = useRef<HTMLDivElement>(null);

    function handleScroll(e: React.WheelEvent<HTMLDivElement>): void {
        const container = planBoxRef.current;
        if(container) {
            container.scrollLeft += e.deltaY;
        }
    }

    return (
        <section className={styles.wrapper}>
            <div className={styles.header}>
                <h2 className={styles.title}>{allPlans.length} {allPlans.length === 1? "plan" : "plans"}</h2>
                <AddNewPlan />
            </div>
            <div className={styles.plansContainer} onWheel={handleScroll} ref={planBoxRef}>
            {allPlans && allPlans.map(el => <PlanCard key={el.id} showPlan={()=> showPlan(el)} data={el} deletePlan={() => deletePlan(el.id)}/>)}
            </div>
        </section>
    );
};

export default Plans;