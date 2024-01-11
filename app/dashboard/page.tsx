import DashboardResolver from "@/components/DashboardResolver";
import styles from '@/styles/PlanMasterDashboard.module.scss'

const PlanMasterDashboard: React.FC = ()=>{

    return (
        <main className={styles.wrapper}>
            <DashboardResolver />
        </main>
    );
};

export default PlanMasterDashboard;