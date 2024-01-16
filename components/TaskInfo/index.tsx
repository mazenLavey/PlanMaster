'use client';

import { useContext, useEffect, useState } from "react";
import { PlansContext } from "@/contexts/PlansContext";
import { SubTask } from "@/types/interfaces";
import { TaskType } from "@/types/interfaces";
import SubtaskCheckbox from "../SubtaskCheckbox";
import './index.scss';

interface Props {
    taskData: TaskType,
    planId: string
}

const TaskInfo: React.FC<Props> = ({taskData, planId}) => {
    const {updataTask} = useContext(PlansContext);

    const [task, setTask] = useState<TaskType | null>(null);

    useEffect(() => {
        if(!taskData) return;

        setTask(taskData);
    }, [taskData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if(!task) return;

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

    const subTaskElements = task?.subTasks.map(el =>{
        const isChecked = el.status;
        const isDisabled = task.stage === "toDo" || task.stage === "done"? true: false;

        return (
            <SubtaskCheckbox key={el.id} data={el} handleChange={handleChange} isChecked={isChecked} isDisabled={isDisabled} />
        );
    });

    return (
        <div className="TaskInfo">
            <h5 className="TaskInfo__Title">{task?.title}</h5>
            <p className="TaskInfo__Brief">{task?.taskDescription}</p>
            <div className="TaskInfo__Subtasks">
                {subTaskElements}
            </div>
        </div>
    );
};

export default TaskInfo;