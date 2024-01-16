import { OperationType, TaskStage } from "@/types/interfaces";

export const LOCAL_STORAGE_KEY = "planMaster";

export const PLAN_STAGES = {
    active: "Active",
    finished: "Finished",
    deleted: "Deleted",
};

export const PLAN_STAGES_COLOR = {
    active: "#ff9453",
    finished: "#3ed364",
    deleted: "#E5E5EA",
};

export const TASK_STAGES: {
    toDo: TaskStage,
    inProcess: TaskStage,
    done: TaskStage,
} = {
    toDo: "toDo",
    inProcess: "inProcess",
    done: "done",
};

export const TASK_STAGES_TEXT = {
    [TASK_STAGES.toDo]: "To Do",
    [TASK_STAGES.inProcess]: "In Process",
    [TASK_STAGES.done]: "Done",
};

export const TASK_STAGES_COLOR = {
    toDo: "#ff746d",
    inProcess: "#ff9453",
    done: "#3ed364",
};

export const OPERATIONS_TYPES: {
    start: OperationType,
    stop: OperationType,
    done: OperationType,
    undo: OperationType,
    delete: OperationType,
} = {
    start: "start",
    stop: "stop",
    done: "done",
    undo: "undo",
    delete: "delete",
}

