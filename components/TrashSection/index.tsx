"use client";

import { PlansContext } from "@/contexts/PlansContext";
import { useContext } from "react";
import PlanCard from "@/components/PlanCard";
import './index.scss';
import Breadcrumbs from "../Breadcrumbs";

const TrashSection: React.FC = ()=>{
    const {deletedPlans} = useContext(PlansContext);

    const renderDeletedPlans = () => {
        return deletedPlans.map(el => <PlanCard key={el.id} data={el} isDeleted/>)
    };

    return (
        <section className="TrashSection">
            <Breadcrumbs />
            <h2 className="TrashSection__Title">Items: {deletedPlans?.length}</h2>
            <div className="TrashSection__Wrapper">
                {renderDeletedPlans()}
            </div>
        </section>
    );
};

export default TrashSection;