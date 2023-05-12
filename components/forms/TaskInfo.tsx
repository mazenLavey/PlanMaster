'use client';

import { PlansContext } from "@/contexts/PlansContext";
import { TaskType } from "@/types/interfaces";
import { useContext, useState } from "react";

interface Props {
    taskData: TaskType,
    planId: string
}

const TaskInfo: React.FC<Props> = ({taskData, planId}) => {
    const [formData, setFormData] = useState<TaskType>(taskData);
    const {updataTask} = useContext(PlansContext);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const {id, checked} = e.target;
        const updateSubTasks = formData.subTasks.map(subtask => {
            if(subtask.id === id) {
                return {
                    ...subtask,
                    status: checked
                }
            } else {
                return subtask
            }
        });

        setFormData(prevValue => {
            return {
                ...prevValue,
                subTasks: updateSubTasks
            }
        });
    };

    function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
        e.stopPropagation();
        updataTask( planId , formData.id, formData, formData.status);
    };

    const subTaskElements = formData.subTasks.map(el =>{
        return (
            <div key={el.id}>
                <input type="checkbox" name={el.id} id={el.id} checked={el.status} onChange={handleChange} />
                <label htmlFor={el.id}>{el.title}</label>
            </div>
        );
    });

    return (
        <div>
            <h5>{formData.title}</h5>
            <p>{formData.taskDescription}</p>
            {subTaskElements}
            <button onClick={handleClick}>save</button>
        </div>
    );
};

export default TaskInfo;