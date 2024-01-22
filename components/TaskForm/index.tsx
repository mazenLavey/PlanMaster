"use client";

import { PlansContext } from "@/contexts/PlansContext";
import { useContext, useEffect, useState } from "react";
import { TaskType, SubTask } from "@/types/interfaces";
import { nanoid } from "nanoid";
import Btn from "@/components/Btn";
import SubTaskSlot from "@/components/SubTaskSlot/SubTaskSlot";
import InputText from "@/components/InputText";
import "./index.scss";

type action = "edit" | "new";

const TASK_FORM_ACTIONS: {
    edit: action,
    new: action,
} = {
    edit: "edit",
    new: "new",
}

interface Props {
    currentPlanId: string,
    taskData?: TaskType,
    action: action,
    closePopup: ()=> void
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
        // adding subtasks data to plan array
        const collectAllData = () => {
            setFormData(prevValue => {
                return {
                    ...prevValue,
                    subTasks: subTasksArray
                };
            });
        };
        collectAllData();
    }, [subTasksArray])

    // handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {value, name} = e.target;
        setFormData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    };

    // add new subtask when clicking on the add button
    const addNewSubTaskField = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const subTask: SubTask = newSubTask();
        setSubTaskArray(prev => [...prev, subTask]);
    }

    const newSubTask = (): SubTask => {
        const uniqueId = nanoid();
        const newSubTask: SubTask = {
            id: uniqueId,
            title: "",
            status: false
        };
        return newSubTask;
    }

    // receiving data from subtask children
    const updateSubTasks = (slotId: string, newtitle: string ): void => {
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

    // delete subtask
    const deleteSubTask = (slotId: string): void => {
        setSubTaskArray(prevValue => prevValue.filter(subtask => subtask.id !== slotId));
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        e.stopPropagation();

        if(action === TASK_FORM_ACTIONS.new) {

            addNewTask(formData, currentPlanId);
            closePopup();
        } else if (action === TASK_FORM_ACTIONS.edit) {

            updataTask(currentPlanId, formData);
            closePopup();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="TaskForm">
            <div className="TaskForm__Body">
                <InputText label="title" name="title" id="title" value={formData.title} onChange={handleChange} required/>
                <InputText label="shortly description the task" tag="textarea" name="taskDescription" id="taskDescription" value={formData.taskDescription} onChange={handleChange}/>
                
                <fieldset className="TaskForm__Subtasks">
                    <legend className="TaskForm__SubtasksTitle">SubTasks</legend>
                    <div className="TaskForm__SubtasksGrid">
                        {subTasksArray.map(el => <SubTaskSlot key={el.id} slotId={el.id} subtaskData={el} updateSubTasks={updateSubTasks} deleteSubTask={()=>deleteSubTask(el.id)}/>)}
                    </div>
                    <button className="TaskForm__NewTaskBtn" type="button" onClick={addNewSubTaskField}>+ add subtask</button>
                </fieldset>
            </div>
            <Btn type="submit">
                {action === TASK_FORM_ACTIONS.new? "add": "save"}
            </Btn>
        </form>
    );
};

export default TaskForm;