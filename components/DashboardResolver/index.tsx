"use client";

import { useEffect, useState, useContext } from "react";
import { PlansContext } from "@/contexts/PlansContext";
import CurrentPlan from "@/components/CurrentPlan";
import Sidebar from "@/components/Sidebar";
import EmptyDashboard from "@/components/EmptyDashboard";
import Spinner from "@/components/Spinner";

const DashboardResolver: React.FC = () => {
    const {currentPlan} = useContext(PlansContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setIsLoading(false);
        }, 1000);

        return () => {
            window.clearTimeout(timer);
        }
    }, []);

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div className="fade-in">
            <Sidebar />
            {
                currentPlan? (
                    <CurrentPlan currentPlanData={currentPlan} />
                ): (
                    <EmptyDashboard />
            )}
        </div>
    );
};

export default DashboardResolver;