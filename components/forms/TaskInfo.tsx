'use client';

import { PlansContext } from "@/contexts/PlansContext";
import { SubTask } from "@/types/interfaces";
import { TaskType } from "@/types/interfaces";
import { useContext, useState } from "react";
import styles from '@/styles/TaskInfo.module.scss';

interface Props {
    taskData: TaskType,
    planId: string
}

const TaskInfo: React.FC<Props> = ({taskData, planId}) => {
    const [task] = useState<TaskType>(taskData);
    const {updataTask} = useContext(PlansContext);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
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

        const allSubtasksDone = updateSubTasks.every(subtask => subtask.status === true);

        const updatedTask: TaskType = {
            ...task,
            stage: allSubtasksDone? "done": task.stage,
            subTasks: updateSubTasks
        };
        updataTask( planId , updatedTask);
    };

    const subTaskElements = task.subTasks.map(el =>{
        return (
            <div key={el.id} className={styles.subtask}>
                <input type="checkbox" name={el.id} id={el.id} checked={el.status} onChange={handleChange} disabled={task.stage === "toDo" || task.stage === "done"? true: false}/>
                <label htmlFor={el.id}>{el.title}</label>
            </div>
        );
    });

    return (
        <div className={styles.info}>
            <h5 className={styles.title}>{task.title}</h5>
            <p className={styles.brief}>{task.taskDescription}</p>
            <div className={styles.subtaskContainer}>
                {subTaskElements}
            </div>
        </div>
    );
};

export default TaskInfo;