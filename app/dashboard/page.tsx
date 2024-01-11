import styles from '@/styles/PlanMasterDashboard.module.scss'
import Sidebar from "@/components/Sidebar";
import PlanConstructor from "./PlanConstructor";

const PlanMasterDashboard: React.FC = ()=>{
    return (
        <main className={styles.wrapper}>
            <Sidebar />
            <PlanConstructor />
        </main>
    );
};

export default PlanMasterDashboard;