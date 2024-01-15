"use client";

import { PlansContext } from "@/contexts/PlansContext";
import { useContext } from "react";
import PlanCard from "@/components/PlanCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeader from "@/components/SectionHeader";
import './index.scss';

const DeletedPlans: React.FC = ()=>{
    const {deletedPlans} = useContext(PlansContext);

    const renderDeletedPlans = () => {
        return deletedPlans?.map(el => <PlanCard key={el.id} data={el} isActive={false}/>)
    };

    return (
        <section className="DeletedPlans">
            <Breadcrumbs />
            <SectionHeader title="trash" />
            <div className="DeletedPlans__Wrapper">
                {renderDeletedPlans()}
            </div>
        </section>
    );
};

export default DeletedPlans;