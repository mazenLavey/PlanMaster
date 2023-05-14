"use client";

import { PlansContext } from "@/contexts/PlansContext";
import { useContext, useEffect, useState } from "react";
import { TaskType, SubTask } from "@/types/interfaces";
import { nanoid } from "nanoid";
import styles from "@/styles/TaskForm.module.scss";
import SubTaskSlot from "@/components/forms/SubTaskSlot";

type action = "edit" | "new"

interface Props {
    currentPlanId: string,
    taskData?: TaskType,
    action: action,
    closePopup?: ()=> void
}

const TaskForm: React.FC<Props> = ({currentPlanId, taskData, action, closePopup})=>{
    const {addNewTask, updataTask} = useContext(PlansContext);
    const [subTasksArray, setSubTaskArray] = useState<SubTask[]>(taskData?.subTasks || [] );
    const [formData, setFormData] = useState<TaskType>({
        id: taskData?.id || nanoid(),
        title: taskData?.title || "",
        taskDescription: taskData?.taskDescription || "",
        subTasks: taskData?.subTasks || [],
        stage: taskData?.stage || "toDo"
    });

    useEffect(()=>{
        collectAllData();
    }, [subTasksArray])

    // handle form input changes
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        const {value, name} = e.target;
        setFormData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    };

    // add new subtask when clicking on the add button
    function addNewSubTaskField(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        const subTask: SubTask = newSubTask();
        setSubTaskArray(prev => [...prev, subTask]);
    }

    function newSubTask():SubTask {
        const uniqueId = nanoid();
        const newSubTask: SubTask = {
            id: uniqueId,
            title: "",
            status: false
        };
        return newSubTask;
    }

    // receiving data from subtask children
    function updateSubTasks(slotId: string, newtitle: string ): void {
        setSubTaskArray(prevValues => {
            return prevValues.map(subTask => {
                if (subTask.id === slotId) {
                    return {
                        ...subTask,
                        title: newtitle
                    }
                } else {
                    return subTask
                };
            });
        });
    };

    // adding subtasks data to plan array
    function collectAllData() {
        setFormData(prevValue => {
            return {
                ...prevValue,
                subTasks: subTasksArray
            };
        });
    };

    // delete subtask
    function deleteSubTask(slotId: string): void {
        setSubTaskArray(prevValue => prevValue.filter(subtask => subtask.id !== slotId));
    }
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        e.stopPropagation();

        if(action === "new") {
            addNewTask(formData, currentPlanId);
            closePopup? closePopup(): null;
        } else if (action === "edit") {
            updataTask(currentPlanId, formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.wrapper}>
            <label htmlFor="title">title</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required/>

            <label htmlFor="taskDescription">shortly description the task</label>
            <textarea name="taskDescription" id="taskDescription" value={formData.taskDescription} onChange={handleChange} required/>
            <fieldset>
                <legend>subTasks</legend>
                <div className={styles.subTasksContainer}>
                    {subTasksArray.map(el => <SubTaskSlot key={el.id} slotId={el.id} subtaskData={el} updateSubTasks={updateSubTasks} deleteSubTask={()=>deleteSubTask(el.id)}/>)}
                </div>
                <button type="button" onClick={addNewSubTaskField}>+ add subTask</button>
            </fieldset>
            <button>{action === "new"? "add": "save"}</button>
        </form>
    );
};

export default TaskForm;