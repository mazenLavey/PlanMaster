import TodoSection from "@/app/dashboard/TodoSection";
import DoingSection from "@/app/dashboard/DoingSection";
import DoneSection from "@/app/dashboard/DoneSection";
import AddNewTask from "@/components/buttons/AddNewTask";
import styles from "@/styles/CurrentPlan.module.scss";
import { PlanType } from "@/types/interfaces";

interface Props {
    currentPlanData: PlanType
}

const CurrentPlan: React.FC<Props> = ({currentPlanData}) => {
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h2 className={styles.title}>{currentPlanData? currentPlanData.title: "title"}</h2>
                
                <h2 className={styles.title}>{currentPlanData? currentPlanData.deadline: "deadLine"}</h2>
                <AddNewTask currentPlanId={currentPlanData?.id}/>
            </header>
            <p>{currentPlanData? currentPlanData.description: "description"}</p>
            <main className={styles.list}>
                <TodoSection currentTaskData={currentPlanData?.toDo} planId={currentPlanData.id}/>
                <DoingSection currentTaskData={currentPlanData?.inProcess} planId={currentPlanData.id}/>
                <DoneSection currentTaskData={currentPlanData?.done} planId={currentPlanData.id}/>
            </main>
        </div>
    );
};

export default CurrentPlan;