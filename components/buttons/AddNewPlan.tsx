"use client";

import { PlansContext } from "@/contexts/PlansContext";
import { useContext } from "react";

const AddNewPlan: React.FC = ()=>{
    const {addNewPlan} = useContext(PlansContext);
    return (
        <button onClick={addNewPlan}>add new plan</button>
    );
};

export default AddNewPlan;