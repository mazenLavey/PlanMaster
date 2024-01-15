import Image from "next/image";
import "./index.scss";

const EmptyDashboard: React.FC = ()=>{
    
    return (
        <div className="EmptyDashboard">
            <div className="EmptyDashboard__Text">
                No Plans
            </div>
            <div className="EmptyDashboard__ImgContainer">
                <Image className="EmptyDashboard__Img" src="/assets/no_plans.webp" alt="task management" fill={true} placeholder="empty" priority={true}/>
            </div>
        </div>
    );
};

export default EmptyDashboard;