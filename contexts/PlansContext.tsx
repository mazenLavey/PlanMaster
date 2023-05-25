"use client";

import { createContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { PlanType, TaskType} from "@/types/interfaces";
import getRandomColors from "@/functions/getRandomColors";
import { stringify } from "querystring";

type Props = {
    children: React.ReactNode
}

interface PlansContextType {
    allPlans: PlanType[],
    currentPlan: PlanType | undefined,
    addNewPlan: () => void,
    showPlan: (planData: PlanType) => void,
    editPlanInfo: (formData: PlanType, planId: string) => void,
    deletePlan: (planId: string) => void,
    addNewTask: (taskData: TaskType, planId: string) => void,
    deleteTask: (planId: string, taskId: string) => void,
    updataTask: (planId: string, updatedTask: TaskType) => void
}

const PlansContext = createContext<PlansContextType>({
    allPlans: [],
    currentPlan: undefined,
    addNewPlan: () => {},
    showPlan: (planData) => {},
    editPlanInfo: (formData, planId) => {},
    deletePlan: (planId) => {},
    addNewTask: (taskData, planId) => {},
    deleteTask: (planId, taskId)=> {},
    updataTask: (planId, updatedTask) => {}
});


const PlansProvider: React.FC<Props> = ({children}) => {
    const [allPlans, setAllPlans] = useState<PlanType[]>([]);
    const [currentPlan, setCurrentPlan] = useState<PlanType | undefined>(undefined);

    useEffect(()=>{
        const plans: string | null = window.localStorage.getItem("planMaster");
        if (plans) {
            setAllPlans(JSON.parse(plans));
        }
    }, []);

    useEffect(()=>{
        function addTolocalStorage() {
            const plans: string = JSON.stringify(allPlans);
            window.localStorage.setItem("planMaster", plans);
        };
        

        if(allPlans.length > 0) {
            setCurrentPlan(oldPlan => {
                const updataCurrent: PlanType | undefined = allPlans.find(plan => plan.id === oldPlan?.id);
                if(updataCurrent) {
                    return updataCurrent;
                } else if(updataCurrent === undefined) {
                    return allPlans[allPlans.length -1];
                } 
            });
            addTolocalStorage();
        } else {
            addTolocalStorage();
            setCurrentPlan(undefined);
        }
    }, [allPlans]);

    function addNewPlan(): void {

        const newPlan: PlanType = {
            id: nanoid(),
            timeStamp: new Date().getTime(),
            status: false,
            title: "",
            description: "",
            deadline: "",
            tasks: [],
            barColors: getRandomColors()
        };
        setAllPlans(prevPlans => [...prevPlans, newPlan]);
        setCurrentPlan(newPlan);
    };

    function showPlan(planData: PlanType): void {
        setCurrentPlan(() => planData);
    };

    function editPlanInfo(formData: PlanType, planId: string): void {

        const {title, description, deadline} = formData;
        setAllPlans((prevValue) => {
            return prevValue.map(plan => {
                if(plan.id === planId) {
                    return {
                        ...plan,
                        title: title,
                        description: description,
                        deadline: deadline
                    }
                } else {
                    return plan;
                }
            });
        });
    };

    function deletePlan(planId: string):void {
        setAllPlans(prevPlans => prevPlans.filter(plan => plan.id !== planId));
    };

    function addNewTask(taskData: TaskType, planId: string): void {
        setAllPlans(prevValue => {
            return prevValue.map(plan => {
                if(plan.id === planId) {
                    return {
                        ...plan,
                        tasks: [...plan.tasks, taskData]
                    };
                };
                return plan;
            });
        });
    };

    function deleteTask(planId: string, taskId: string): void {
        setAllPlans(prevValue => {
            return prevValue.map(plan => {
                if(plan.id === planId) {
                    // remove it from the current stage
                    const updatedTasks: TaskType[] = plan.tasks.filter(task => task.id !== taskId);
                    return {
                        ...plan,
                        tasks: updatedTasks
                    }
                } else {
                    return plan;
                }
            });
        });
    };

    function updataTask(planId: string, updatedTask: TaskType): void {
        setAllPlans(prevValue => {
            return prevValue.map(plan => {
                if(plan.id === planId) {
                    const updataTasks: TaskType[] = plan.tasks.map(task => task.id === updatedTask.id? updatedTask : task);
                    const checkPlanStatus: boolean = updataTasks.every(task => task.stage === "done");
                    return {
                        ...plan,
                        status: checkPlanStatus,
                        tasks: updataTasks
                    };
                } else {
                    return plan;
                };
            });
        });
    }

    return (
        <PlansContext.Provider value={{allPlans, currentPlan, addNewPlan, showPlan, editPlanInfo, deletePlan, addNewTask, deleteTask, updataTask}}>
            {children}
        </PlansContext.Provider>
    );
};

export {PlansContext, PlansProvider}
