import { BarLoader, BeatLoader } from "react-spinners";
import "./index.scss";

type Props = {
    type?: "grid" | "beat",
    color?: string,
}

const Spinner: React.FC<Props> = ({ type = "grid", color })=>{
    const SIZE = 8;

    return (
        <div className="Spinner__Container fade-in">
            {type === "grid" ?
                <BarLoader color={color ?? "#f67f5d"} />
                :
                <BeatLoader color={color ?? "#ffff"} size={SIZE}/>
            }
        </div>
    );
};

export default Spinner;