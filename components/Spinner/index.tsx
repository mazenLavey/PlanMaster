import { PacmanLoader } from "react-spinners";
import "./index.scss";

const Spinner: React.FC = ()=>{

    return (
        <div className="Spinner__Container fade-in">
            <PacmanLoader color="#f67f5d" />
        </div>
    );
};

export default Spinner;