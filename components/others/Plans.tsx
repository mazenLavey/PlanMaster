"use client";

import { useContext } from "react";
import { PlansContext } from "@/contexts/PlansContext";
import PlanCard from "@/components/cards/PlanCard";

const Plans: React.FC = ()=>{
    const {allPlans, showPlan, deletePlan} = useContext(PlansContext);

    return (
        <section>
            <h2>{allPlans.length === 1? "plan" : "plans"} ({allPlans.length})</h2>
            <div>
                {allPlans && allPlans.map(el => <PlanCard key={el.id} showPlan={()=> showPlan(el)} data={el} deletePlan={() => deletePlan(el.id)}/>)}
            </div>
        </section>
    );
};

export default Plans;