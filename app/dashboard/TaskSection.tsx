import TaskCard from '@/components/TaskCard';
import styles from '@/styles/TaskSection.module.scss';
import { nanoid } from "nanoid";
import { PlanType, TaskStage } from '@/types/interfaces';

interface Props {
    currentPlanData: PlanType,
    section: TaskStage
}

const TaskSection: React.FC<Props> = ({currentPlanData, section})=>{
    const tasksSum = currentPlanData.tasks.filter(task => task.stage === section).length;
    const tasksSumText = tasksSum > 0? tasksSum : 0;
    const sectionTypeText = section === "toDo" ? `To Do`: section === "inProcess"? `In Process` : `Done`;
    const sectionClassName = section === "toDo" ? "": section === "inProcess"? styles.inProcess : styles.done;
    
    const renderTasks = currentPlanData?.tasks.map(el => {
        if(el.stage === section) {
            return <TaskCard key={nanoid()} taskData={el} planId={currentPlanData.id}/>
        }});

    return (
        <section className={styles.wrapper}>
            <div className={styles.title}>
                <h3 className={styles.text}>{sectionTypeText}</h3>
                <span className={`${styles.circle} ${sectionClassName}`}>{tasksSumText}</span>
            </div>
            <div className={styles.tasks}>
                {renderTasks}
            </div>
        </section>
    );
};

export default TaskSection;