import "./index.scss";

type Props = {
    children: React.ReactNode,
    onClick?: () => void,
}

const Btn: React.FC<Props> = ({ children, onClick }) => {
    return(
        <button className="Btn" onClick={onClick}>
            { children }
        </button>
    )
}

export default Btn;