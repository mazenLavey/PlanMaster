import styles from '@/styles/Dashboard.module.scss'
import Sidebar from "@/components/others/Sidebar";
import PlanConstructor from "./PlanConstructor";

const Dashboard: React.FC = ()=>{
    return (
        <main className={styles.wrapper}>
            <Sidebar />
            <PlanConstructor />
        </main>
    );
};

export default Dashboard;