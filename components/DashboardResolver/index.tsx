"use client";

import { useEffect, useState, useContext } from "react";
import { PlansContext } from "@/contexts/PlansContext";
import CurrentPlan from "@/components/CurrentPlan";
import EmptyDashboard from "@/components/EmptyDashboard";
import Spinner from "@/components/Spinner";
import PlansActionBar from "@/components/PlansActionBar";
import PlansSlider from "@/components/PlansSlider";
import "./index.scss";

const DashboardResolver: React.FC = () => {
    const {currentPlan, isDataFetching} = useContext(PlansContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setIsLoading(false);
        }, 500);

        return () => {
            window.clearTimeout(timer);
        }
    }, []);

    if(isLoading || isDataFetching) {
        return <Spinner />
    }

    return (
        <div className="DashboardResolver fade-in">
            <PlansActionBar />
            <PlansSlider />
            { currentPlan ? <CurrentPlan currentPlanData={currentPlan} />: <EmptyDashboard /> }
        </div>
    );
};

export default DashboardResolver;