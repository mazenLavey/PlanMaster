"use client";

import { createContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { DataStorage, PlanType, TaskType} from "@/types/interfaces";
import getRandomColors from "@/functions/getRandomColors";
import { LOCAL_STORAGE_KEY } from "@/constants";

type Props = {
    children: React.ReactNode
}

interface PlansContextType {
    activePlans: PlanType[],
    deletedPlans: PlanType[],
    archivedPlans: PlanType[],
    currentPlan: PlanType | undefined,
    isNewUser: boolean,
    addNewPlan: () => void,
    showPlan: (planData: PlanType) => void,
    editPlanInfo: (formData: PlanType, planId: string) => void,
    deletePlan: (planId: string) => void,
    restorePlan: (planId: string) => void,
    archivePlan: (planId: string) => void,
    unarchivePlan: (planId: string) => void,
    addNewTask: (taskData: TaskType, planId: string) => void,
    deleteTask: (planId: string, taskId: string) => void,
    updataTask: (planId: string, updatedTask: TaskType) => void
}

const PlansContext = createContext<PlansContextType>({
    activePlans: [],
    currentPlan: undefined,
    deletedPlans: [],
    archivedPlans: [],
    isNewUser: true,
    addNewPlan: () => {},
    showPlan: (planData) => {},
    editPlanInfo: (formData, planId) => {},
    deletePlan: (planId) => {},
    restorePlan: (planId) => {},
    unarchivePlan: (planId) => {},
    archivePlan: (planId) => {},
    addNewTask: (taskData, planId) => {},
    deleteTask: (planId, taskId)=> {},
    updataTask: (planId, updatedTask) => {}
});


const PlansProvider: React.FC<Props> = ({children}) => {
    const [activePlans, setActivePlans] = useState<PlanType[]>([]);
    const [currentPlan, setCurrentPlan] = useState<PlanType | undefined>(undefined);
    const [deletedPlans, setDeletedPlans] = useState<PlanType[]>([]);
    const [archivedPlans, setArchivedPlans] = useState<PlanType[]>([]);
    const [isNewUser, setIsNewUser] = useState<boolean>(true);

    useEffect(()=>{
        const data: string | null = window.localStorage.getItem(LOCAL_STORAGE_KEY);
            
        if (data) {
            const plans: DataStorage = JSON.parse(data);
    
            setActivePlans(plans.activePlans?? []);
            setDeletedPlans(plans.deletedPlans?? []);
            setArchivedPlans(plans.archivedPlans?? []);
            setIsNewUser(false);
        };
    }, []);

    useEffect(()=>{
        function addTolocalStorage() {
            const plans: DataStorage = {
                activePlans,
                deletedPlans,
                archivedPlans,
            };
            
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(plans));
        };
        

        if(activePlans.length > 0) {
            setCurrentPlan(oldPlan => {
                const updataCurrent: PlanType | undefined = activePlans.find(plan => plan.id === oldPlan?.id);
    
                if(updataCurrent) {
                    return updataCurrent;
                } else if(updataCurrent === undefined) {
                    return activePlans[activePlans.length -1];
                } 
            });
            addTolocalStorage();
        } else {
            addTolocalStorage();
            setCurrentPlan(undefined);
        }
    }, [activePlans, deletedPlans, archivedPlans]);

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
        setActivePlans(prevPlans => [...prevPlans, newPlan]);
        setCurrentPlan(newPlan);
    };

    function showPlan(planData: PlanType): void {
        setCurrentPlan(() => planData);
    };

    function editPlanInfo(formData: PlanType, planId: string): void {

        const {title, description, deadline} = formData;
        setActivePlans((prev) => {
            return prev.map(plan => {
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
        const targetedPlan = activePlans.find(plan => plan.id === planId);

        if(targetedPlan) {
            setDeletedPlans(prev => [...prev, targetedPlan]);
        };

        setActivePlans(prevPlans => prevPlans.filter(plan => plan.id !== planId));
    };

    function addNewTask(taskData: TaskType, planId: string): void {
        setActivePlans(prev => {
            return prev.map(plan => {
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
        setActivePlans(prev => {
            return prev.map(plan => {
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

    function restorePlan(planId: string): void {
        const targetedPlan = deletedPlans.find(plan => plan.id === planId);

        if(!targetedPlan) return;

        setDeletedPlans(prev => prev.filter(el => el.id !== planId));
        setActivePlans(prev => [...prev, targetedPlan]);
    };

    function unarchivePlan(planId: string): void {
        const targetedPlan = archivedPlans.find(plan => plan.id === planId);

        if(!targetedPlan) return;

        setArchivedPlans(prev => prev.filter(el => el.id !== planId));
        setActivePlans(prev => [...prev, targetedPlan]);
    };

    function archivePlan(planId: string): void {
        const targetedPlan = activePlans.find(plan => plan.id === planId);

        if(targetedPlan) {
            setArchivedPlans(prev => [...prev, targetedPlan]);
        };

        setActivePlans(prevPlans => prevPlans.filter(plan => plan.id !== planId));
    };

    function updataTask(planId: string, updatedTask: TaskType): void {
        setActivePlans(prev => {
            return prev.map(plan => {
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
        <PlansContext.Provider value={{
            activePlans, 
            deletedPlans,
            archivedPlans,
            currentPlan, 
            isNewUser, 
            addNewPlan, 
            showPlan, 
            editPlanInfo, 
            deletePlan, 
            restorePlan, 
            archivePlan,
            unarchivePlan,
            addNewTask, 
            deleteTask, 
            updataTask, 
        }}>
            {children}
        </PlansContext.Provider>
    );
};

export {PlansContext, PlansProvider}
