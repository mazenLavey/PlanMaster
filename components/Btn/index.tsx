import "./index.scss";

type Props = {
    children: React.ReactNode,
    onClick?: () => void,
    type?: "button" | "reset" | "submit",
}

const Btn: React.FC<Props> = ({ children, onClick, type = "button" }) => {
    return(
        <button className="Btn" type={type} onClick={onClick}>
            { children }
        </button>
    )
}

export default Btn;