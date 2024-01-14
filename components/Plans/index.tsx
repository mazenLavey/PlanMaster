"use client";

import { useContext, useEffect, useRef } from "react";
import { PlansContext } from "@/contexts/PlansContext";
import PlanCard from "@/components/PlanCard";
import styles from "./Plans.module.scss";
import AddNewPlan from "@/components/AddNewPlan";
import TrashBtn from "@/components/TrashBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@/components/Tooltip";
import Link from "next/link";
import routes from "@/routes";

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
                    <Tooltip tooltipText="Statistics">
                        <Link href={routes.statistics}>
                            <FontAwesomeIcon icon={faChartPie} size="1x"/>
                        </Link>
                    </Tooltip>
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