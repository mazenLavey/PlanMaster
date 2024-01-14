import "./index.scss";

type Props = {
    title: string;
}

const SectionHeader: React.FC<Props> = ({title}) => {
    return(
        <div className="SectionHeader">
            {title}
        </div>
    )
}

export default SectionHeader;