'use client';

import { PlansContext } from "@/contexts/PlansContext";
import { SubTask } from "@/types/interfaces";
import { TaskType } from "@/types/interfaces";
import { useContext, useState } from "react";
import './index.scss';
import classNames from "classnames";

interface Props {
    taskData: TaskType,
    planId: string
}

const TaskInfo: React.FC<Props> = ({taskData, planId}) => {
    const {updataTask} = useContext(PlansContext);

    const [task, setTask] = useState<TaskType>(taskData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {id, checked} = e.target;

        const updateSubTasks: SubTask[] = task.subTasks.map(subtask => {
            if(subtask.id === id) {
                return {
                    ...subtask,
                    status: checked
                }
            } else {
                return subtask
            }
        });

        const isAllSubtasksDone = updateSubTasks.every(subtask => subtask.status === true);

        const updatedTask: TaskType = {
            ...task,
            stage: isAllSubtasksDone? "done": task.stage,
            subTasks: updateSubTasks
        };

        setTask(updatedTask);
        updataTask( planId , updatedTask);
    };

    const subTaskElements = task.subTasks.map(el =>{
        const isChecked = el.status;
        const isDisabled = task.stage === "toDo" || task.stage === "done"? true: false;

        return (
            <div key={el.id} className="TaskInfo__Subtask">
                <input 
                    className={classNames("TaskInfo__Checkbox", {
                        "TaskInfo__Checkbox--Checked": isChecked,
                        "TaskInfo__Checkbox--Disabled": isDisabled,
                    })} 
                    type="checkbox" 
                    name={el.id} 
                    id={el.id} 
                    checked={isChecked} 
                    onChange={handleChange} 
                    disabled={isDisabled}
                />
                <label 
                    className={classNames("TaskInfo__Label", {
                        "TaskInfo__Label--Checked": isChecked,
                        "TaskInfo__Label--Disabled": isDisabled,
                    })} 
                    htmlFor={el.id}>
                        {el.title}
                </label>
            </div>
        );
    });

    return (
        <div className="TaskInfo">
            <h5 className="TaskInfo__Title">{task.title}</h5>
            <p className="TaskInfo__Brief">{task.taskDescription}</p>
            <div className="TaskInfo__Subtasks">
                {subTaskElements}
            </div>
        </div>
    );
};

export default TaskInfo;