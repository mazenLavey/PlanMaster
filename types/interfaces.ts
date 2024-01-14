

export type TaskStage = "toDo" | "inProcess" | "done";
export type OperationType = "start" | "stop" | "done" | "undo" | "delete";

export interface PlanType {
    readonly id: string,
    readonly timeStamp: number;
    status: boolean,
    title: string,
    description: string,
    deadline: string,
    tasks: TaskType[],
    barColors: string[],
}

export interface TaskType {
    readonly id: string,
    title: string,
    taskDescription: string,
    stage: TaskStage,
    subTasks: SubTask[]
}

export interface SubTask {
    readonly id: string,
    title: string,
    status: boolean
}

export interface DataStorage  {
    activePlans: PlanType[],
    deletedPlans: PlanType[],
    archivedPlans: PlanType[],
}