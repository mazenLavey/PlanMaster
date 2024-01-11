"use client";

import { useContext, useEffect, useRef } from "react";
import { PlansContext } from "@/contexts/PlansContext";
import PlanCard from "@/components/PlanCard";
import styles from "./Plans.module.scss";
import AddNewPlan from "@/components/AddNewPlan";

const Plans: React.FC = () => {
    const { allPlans, showPlan, deletePlan } = useContext(PlansContext);
    const planBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = planBoxRef.current;
        if (container) {
            container.addEventListener("wheel", handleScroll, { passive: false });

            return () => {
                container.removeEventListener("wheel", handleScroll);
            };
        }
    }, [])

    function handleScroll(e: any): void {
        e.preventDefault();
        const container = planBoxRef.current;
        if (container) {
            container.scrollLeft += e.deltaY;
        }
    }

    return (
        <section className={styles.wrapper}>
            <div className={styles.header}>
                <h2 className={`${styles.title} ${allPlans.length > 0 ? "" : styles.hide}`} >
                    {allPlans.length} {allPlans.length > 1 ? "plans" : "plan"}
                </h2>
                <AddNewPlan />
            </div>
            <div className={styles.plansContainer} ref={planBoxRef}>
                {allPlans && allPlans.map(el => <PlanCard key={el.id} showPlan={() => showPlan(el)} data={el} deletePlan={() => deletePlan(el.id)} />)}
            </div>
        </section>
    );
};

export default Plans;