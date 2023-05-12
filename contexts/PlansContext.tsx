"use client";

import { createContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { PlanType, TaskType, TaskStatus, OperationType } from "@/types/interfaces";

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
    changeTaskStatus: (planId: string, taskId: string, taskStatus: TaskStatus, operationType: OperationType) => void,
    deleteTask: (planId: string, taskId: string, taskStatus: TaskStatus) => void,
    updataTask: (planId: string, taskId: string, updatedTask: TaskType, taskStatus: TaskStatus) => void
}

const PlansContext = createContext<PlansContextType>({
    allPlans: [],
    currentPlan: undefined,
    addNewPlan: () => {},
    showPlan: (planData) => {},
    editPlanInfo: (formData, planId) => {},
    deletePlan: (planId) => {},
    addNewTask: (taskData, planId) => {},
    changeTaskStatus: (planId, taskId, taskStatus, operationType)=> {},
    deleteTask: (planId, taskId, taskStatus)=> {},
    updataTask: (planId, taskId, updatedTask, taskStatus) => {}
});


const PlansProvider: React.FC<Props> = ({children}) => {
    const [allPlans, setAllPlans] = useState<PlanType[]>([]);
    const [currentPlan, setCurrentPlan] = useState<PlanType | undefined>(undefined);
    console.log("reneder context");
    
    useEffect(()=>{
        setCurrentPlan(oldValue => {
            const updataCurrent = allPlans.find(plan => plan.id === oldValue?.id);
            return updataCurrent;
        })
    }, [allPlans]);

    function addNewPlan(): void {
        const defaultPlanNum: string = (allPlans.length + 1).toString(); 
        const newPlan: PlanType = {
            id: nanoid(),
            timeStamp: new Date().getTime(),
            status: false,
            title: `new plan ${defaultPlanNum}`,
            description: "descript your plan",
            deadline: "",
            toDo: [],
            inProcess: [],
            done: []
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
        // delete from plans array
        setAllPlans(prevPlans => prevPlans.filter(plan => plan.id !== planId));

        // delete from current plan state
        setCurrentPlan(prevValue => prevValue?.id === planId? undefined : prevValue);
    };

    function addNewTask(taskData: TaskType, planId: string): void {
        setAllPlans(prevValue => {
            return prevValue.map(plan => {
                if(plan.id === planId) {
                    return {
                        ...plan,
                        toDo: [...plan.toDo, taskData]
                    };
                };
                return plan;
            });
        });
    };

    function deleteTask(planId: string, taskId: string, taskStatus: TaskStatus): void {
        setAllPlans(prevValue => {
            return prevValue.map(plan => {
                if(plan.id === planId) {
                    // remove it from the current stage
                    const updatedTasks: TaskType[] = plan[taskStatus].filter(task => task.id !== taskId);
                    plan[taskStatus] = updatedTasks;
                    return plan
                } else {
                    return plan;
                }
            });
        });
    };

    function changeTaskStatus(planId: string, taskId: string, taskStatus: TaskStatus, operationType: OperationType): void {
        setAllPlans(prevValue => {
            return prevValue.map(plan => {
                if(plan.id === planId) {
                    // find the targeted task
                    const targetedTask: TaskType = plan[taskStatus].filter(task => task.id === taskId)[0];

                    // remove it from the prev stage
                    const updatedTasks: TaskType[] = plan[taskStatus].filter(task => task.id !== taskId);
                    plan[taskStatus] = updatedTasks;

                    // change the task status
                    if(operationType === "next") {
                        targetedTask.status = "inProcess";
                        // add it to the targeted stage
                        plan.inProcess = [...plan.inProcess, targetedTask];
                    } else if (operationType === "back") {
                        targetedTask.status = "toDo";
                        // add it to the targeted stage
                        plan.toDo = [...plan.toDo, targetedTask];
                    } else if (operationType === "done") {
                        targetedTask.status = "done";
                        // add it to the targeted stage
                        plan.done = [...plan.done, targetedTask];
                    } else if (operationType === "undo") {
                        targetedTask.status = "inProcess";
                        // add it to the targeted stage
                        plan.inProcess = [...plan.inProcess, targetedTask];
                    }
                    return plan;
                } else {
                    return plan;
                }
            });
        });
    };

    function updataTask(planId: string, taskId: string, updatedTask: TaskType, taskStatus: TaskStatus): void {

        setAllPlans(prevValue => {
            return prevValue.map(plan => {
                if(plan.id === planId) {
                    const updataTasks: TaskType[] = plan[taskStatus].map(task => task.id === taskId? updatedTask : task);
                    return {
                        ...plan,
                        [taskStatus]: updataTasks
                    };

                } else {
                    return plan;
                };
            });
        });
    }

    return (
        <PlansContext.Provider value={{allPlans, currentPlan, addNewPlan, showPlan, editPlanInfo, deletePlan, addNewTask, changeTaskStatus, deleteTask, updataTask}}>
            {children}
        </PlansContext.Provider>
    );
};

export {PlansContext, PlansProvider}
