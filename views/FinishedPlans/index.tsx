"use client";

import { PlansContext } from "@/contexts/PlansContext";
import { useContext } from "react";
import PlanCard from "@/components/PlanCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeader from "@/components/SectionHeader";
import './index.scss';

const FinishedPlans: React.FC = ()=>{
    const {archivedPlans} = useContext(PlansContext);

    const renderArchivedPlans = () => {
        return archivedPlans?.map(el => <PlanCard key={el.id} data={el} isActive={false}/>)
    };

    return (
        <div className="FinishedPlans">
            <Breadcrumbs />
            <SectionHeader title="Finished Plans" />
            <div className="FinishedPlans__Wrapper">
                {renderArchivedPlans()}
            </div>
        </div>
    );
};

export default FinishedPlans;