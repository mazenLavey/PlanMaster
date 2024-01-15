"use client"

import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { useContext } from "react";
import { PlansContext } from "@/contexts/PlansContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeader from "@/components/SectionHeader";
import "./index.scss";

const Statistics: React.FC = () => {
    const {activePlans, deletedPlans, archivedPlans} = useContext(PlansContext);

    const finishedPlans = activePlans.filter(plan => plan.status).length + archivedPlans.length;

    const data =  {
        labels: ['Active', 'Finished', 'Deleted'],
        datasets: [{
            label: ' Total',
            data: [activePlans.length, finishedPlans, deletedPlans.length],
            backgroundColor: [
                '#ff9a7e',
                '#3ed364',
                '#E5E5EA',
            ],
            borderWidth: 0,
            }]
    };

    return(
        <section className="Statistics">
            <Breadcrumbs />
            <SectionHeader title="Statistics"/>
            <div className="Statistics__Wrapper">
                <div className="Statistics__Container">
                    <Chart type="doughnut" data={data}/>
                </div>
            </div>
        </section>
    )
}

export default Statistics;