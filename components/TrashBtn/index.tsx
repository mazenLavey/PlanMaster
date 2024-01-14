"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import Link from "next/link";
import routes from "@/routes";
import "./index.scss";
import Tooltip from '../Tooltip';

type Props = {
    isActive: boolean;
    count: number;
}

const TrashBtn: React.FC<Props> = ({isActive = false, count}) => {


    return (
        <Tooltip tooltipText='Go to deleted plans'>
            <Link
                className='TrashBtn'
                href={routes.trash} 
                style={{
                pointerEvents: isActive? "auto" : "none", 
                opacity: isActive? "1": "0.5"
            }}>
                <span className='TrashBtn__Badge'>{count}</span>
                <FontAwesomeIcon icon={faTrashCan} />
            </Link>
        </Tooltip>
    )
}

export default TrashBtn;