

type SubTaskStatus = true | false;
type PlanStatus = true | false;
export type TaskStatus = "toDo" | "inProcess" | "done";
export type OperationType = "next" | "back" | "done" | "undo" ;

export interface PlanType {
    readonly id: string,
    readonly timeStamp: number;
    readonly status: PlanStatus,
    title: string,
    description: string,
    deadline: string,
    toDo: TaskType[],
    inProcess: TaskType[],
    done: TaskType[],
}

export interface TaskType {
    readonly id: string,
    title: string,
    taskDescription: string,
    status: TaskStatus,
    subTasks: SubTask[]
}

export interface SubTask {
    readonly id: string,
    title: string,
    status: SubTaskStatus
}

export interface TasksSectionProps {
    currentTaskData: TaskType[] | undefined,
    planId: string
}