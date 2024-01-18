"use client"

import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { useContext } from "react";
import { PlansContext } from "@/contexts/PlansContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeader from "@/components/SectionHeader";
import { PLAN_STAGES, PLAN_STAGES_COLOR, TASK_STAGES, TASK_STAGES_COLOR } from '@/constants';
import { PlanType, TaskType } from '@/types/interfaces';
import "./index.scss";
import DoughnutChart from '@/components/DoughnutChart';
import BarChart from '@/components/BarChart';

const Statistics: React.FC = () => {
    const {activePlans, deletedPlans, archivedPlans} = useContext(PlansContext);

    const finishedPlans = activePlans.filter(plan => plan.isFinished).length + archivedPlans.length;
    
    const getTasksFromPlans = (plans: PlanType[] ): (TaskType | null)[] =>  {
        return plans.map(plan => plan.tasks.length === 0 ? null : plan.tasks).filter(task => task !== null).flat();
    };

    const filterTaskByStage = (tasks: (TaskType | null)[], stage: string) => {
        return tasks.filter(task => task?.stage === stage).length
    };

    const finishedTasksFiltered = getTasksFromPlans(archivedPlans);
    const activeTasksFiltered = getTasksFromPlans(activePlans);

    const toDoTasks = filterTaskByStage(activeTasksFiltered, TASK_STAGES.toDo);
    const inProcessTasks = filterTaskByStage(activeTasksFiltered, TASK_STAGES.inProcess);
    const doneTasks = filterTaskByStage([...finishedTasksFiltered, ...activeTasksFiltered], TASK_STAGES.done);


    return(
        <section className="Statistics">
            <Breadcrumbs />
            <SectionHeader title="Statistics"/>
            <div className="Statistics__Wrapper">
                <DoughnutChart 
                    title='Plans' 
                    data={[ activePlans.length, finishedPlans, deletedPlans.length ]} 
                    labels={[ PLAN_STAGES.active, PLAN_STAGES.finished, PLAN_STAGES.deleted ]} 
                    colors={[ PLAN_STAGES_COLOR.active, PLAN_STAGES_COLOR.finished, PLAN_STAGES_COLOR.deleted ]}/>
                <BarChart
                    title='Tasks'
                    data={[ toDoTasks, inProcessTasks, doneTasks ]}
                    labels={[ TASK_STAGES.toDo, TASK_STAGES.inProcess, TASK_STAGES.done ]}
                    colors={[ TASK_STAGES_COLOR.toDo, TASK_STAGES_COLOR.inProcess, TASK_STAGES_COLOR.done ]}
                />
            </div>
        </section>
    )
}

export default Statistics;