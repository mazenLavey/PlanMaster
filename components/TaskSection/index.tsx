import TaskCard from '@/components/TaskCard';
import { PlanType, TaskStage } from '@/types/interfaces';
import classNames from 'classnames';
import { TASK_STAGES, TASK_STAGES_TEXT } from '@/constants';
import './index.scss';

interface Props {
    currentPlanData: PlanType,
    section: TaskStage
}

const TaskSection: React.FC<Props> = ({currentPlanData, section})=>{
    const tasksSum = currentPlanData.tasks.filter(task => task.stage === section).length;
    const tasksSumText = tasksSum > 0? tasksSum : 0;
    const sectionTypeText = TASK_STAGES_TEXT[section];
    
    const renderTasks = currentPlanData?.tasks.map((el, index) => {
        if(el.stage === section) {
            return <TaskCard key={el.id} taskData={el} planId={currentPlanData.id}/>
        }});

    return (
        <section className="TaskSection">
            <div className="TaskSection__Header">
                <h3 className="TaskSection__Title">{sectionTypeText}</h3>
                <span className={classNames("TaskSection__Badge", {
                    "TaskSection__Badge--InProcess": section === TASK_STAGES.inProcess,
                    "TaskSection__Badge--Done": section === TASK_STAGES.done,
                })}>{tasksSumText}</span>
            </div>
            <div className="TaskSection__Tasks">
                {renderTasks}
            </div>
        </section>
    );
};

export default TaskSection;