"use client";

import { useContext, useEffect, useRef } from "react";
import { PlansContext } from "@/contexts/PlansContext";
import PlanCard from "@/components/PlanCard";
import styles from "./Plans.module.scss";
import AddNewPlan from "@/components/AddNewPlan";
import TrashBtn from "../TrashBtn";

const Plans: React.FC = () => {
    const { activePlans, deletedPlans } = useContext(PlansContext);
    const planBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = planBoxRef.current;
        if (container) {
            container.addEventListener("wheel", handleScroll, { passive: false });

            return () => {
                container.removeEventListener("wheel", handleScroll);
            };
        }
    }, []);

    const renderPlans = () => {
        if(!activePlans) return;

        return activePlans.map(el => <PlanCard key={el.id} data={el}/>)
    }

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
                <h2 className={`${styles.title} ${activePlans.length > 0 ? "" : styles.hide}`} >
                    {activePlans.length} {activePlans.length > 1 ? "plans" : "plan"}
                </h2>
                <div className={styles.actions}>
                    <TrashBtn isActive={deletedPlans.length > 0} count={deletedPlans.length}/>
                    <AddNewPlan />
                </div>
            </div>
            <div className={styles.plansContainer} ref={planBoxRef}>
                {renderPlans()}
            </div>
        </section>
    );
};

export default Plans;