import classNames from "classnames";
import Spinner from "@/components/Spinner";
import "./index.scss";

type Props = {
    children: React.ReactNode,
    className?: string,
    isLoading?: boolean,
    onClick?: () => void,
    type?: "button" | "reset" | "submit",
    color?: "white" | "orange" | "black",
}

const Btn: React.FC<Props> = ({ 
    children,
    className,
    isLoading = false,
    onClick, 
    type = "button", 
    color = "orange" 
}) => {
    return(
        <button className={classNames(["Btn", className], {
            "Btn--Orange": color === "orange",
            "Btn--White": color === "white",
            "Btn--Black": color === "black",
        })} 
        type={type} 
        onClick={onClick}
        disabled={isLoading}>
            { isLoading? <Spinner type="beat"/> : children }
        </button>
    )
}

export default Btn;