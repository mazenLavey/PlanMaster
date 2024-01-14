"use client"

import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { useContext } from "react";
import { PlansContext } from "@/contexts/PlansContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeader from "@/components/SectionHeader";
import "./index.scss";

const Charts: React.FC = () => {
    const {activePlans, deletedPlans} = useContext(PlansContext);

    const data =  {
        labels: ['Done', 'Active', 'Deleted'],
        datasets: [{
            label: ' Total',
            data: [0, deletedPlans.length, activePlans.length],
            backgroundColor: [
                '#3ed364',
                '#f67f5d',
                '#D1D1D6',
            ],
            borderWidth: 0,
            }]
    };

    return(
        <section className="Charts">
            <Breadcrumbs />
            <SectionHeader title="charts"/>
            <div className="Charts__Wrapper">
                <div className="Charts__Container">
                    <Chart type="doughnut" data={data}/>
                </div>
            </div>
        </section>
    )
}

export default Charts;