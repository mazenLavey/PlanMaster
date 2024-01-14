import { useRouter, usePathname } from "next/navigation";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";
import Tooltip from "../Tooltip";

const Breadcrumbs: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const getPrevPagePath = () => {
        const parsePathname = pathname.split('/');

        if(!parsePathname) return;

        if(parsePathname.length === 1) {
            return parsePathname[0].split("-").join(" ");
        }

        return parsePathname[parsePathname.length - 2].split("-").join(" ");
    }

    const handleClick = () => {
        router.back();
    }

    return (
        <Tooltip tooltipText="Go back">
            <div className="Breadcrumbs" onClick={handleClick}>
                <FontAwesomeIcon className="Breadcrumbs__Icon" icon={faCircleArrowLeft} size="sm"/>
                <span className="Breadcrumbs__Text">{getPrevPagePath()}</span>
            </div>
        </Tooltip>
    )
}

export default Breadcrumbs;