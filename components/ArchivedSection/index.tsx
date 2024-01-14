"use client";

import { PlansContext } from "@/contexts/PlansContext";
import { useContext } from "react";
import PlanCard from "@/components/PlanCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeader from "@/components/SectionHeader";
import './index.scss';

const ArchivedSection: React.FC = ()=>{
    const {archivedPlans} = useContext(PlansContext);

    const renderArchivedPlans = () => {
        return archivedPlans.map(el => <PlanCard key={el.id} data={el} isDeleted/>)
    };

    return (
        <section className="ArchivedSection">
            <Breadcrumbs />
            <SectionHeader title="Finished Plans" />
            <div className="ArchivedSection__Wrapper">
                {renderArchivedPlans()}
            </div>
        </section>
    );
};

export default ArchivedSection;