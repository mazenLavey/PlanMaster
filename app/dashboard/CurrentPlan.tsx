import AddNewTask from "@/components/buttons/AddNewTask";
import styles from "@/styles/CurrentPlan.module.scss";
import { PlanType } from "@/types/interfaces";
import TaskSection from "./TaskSection";

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
                <TaskSection currentPlanData={currentPlanData} section="toDo"/>
                <TaskSection currentPlanData={currentPlanData} section="inProcess"/>
                <TaskSection currentPlanData={currentPlanData} section="done"/>
            </main>
        </div>
    );
};

export default CurrentPlan;