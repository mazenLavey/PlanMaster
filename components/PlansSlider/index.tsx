"use client";

import { useContext } from "react";
import { PlansContext } from "@/contexts/PlansContext";
import PlanCard from "@/components/PlanCard";
import "./index.scss";

const PlansSlider: React.FC = () => {
    const { activePlans, currentPlan } = useContext(PlansContext);

    const renderPlans = () => {
        if(!activePlans) return;

        return activePlans.map(el => <PlanCard key={el.id} data={el} isCurrent={currentPlan?.id === el.id}/>)
    }

    return (
        <div className="PlansSlider">
            {renderPlans()}
        </div>
    );
};

export default PlansSlider;