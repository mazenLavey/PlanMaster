"use client";

import { useContext } from "react";
import { PlansContext } from "@/contexts/PlansContext";
import routes from "@/routes";
import Btn from "@/components/Btn";
import NavigationBtn from "@/components/NavigationBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie, faClipboardCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import classNames from "classnames";
import "./index.scss";

const PlansActionBar: React.FC = () => {
    const { activePlans, deletedPlans, addNewPlan } = useContext(PlansContext);

    return(
        <div className="PlansActionBar">
            <h2 className={classNames("PlansActionBar__Title", {
                "PlansActionBar__Title--Hide": activePlans.length === 0,
            })} >
                {activePlans.length} {activePlans.length > 1 ? "plans" : "plan"}
            </h2>
            <div className="PlansActionBar__Actions">
                <NavigationBtn route={routes.finishedPlans} tooltipText="Finished plans">
                    <FontAwesomeIcon icon={faClipboardCheck} size="1x"/>
                </NavigationBtn>
                <NavigationBtn route={routes.statistics} tooltipText="Statistics">
                    <FontAwesomeIcon icon={faChartPie} size="1x"/>
                </NavigationBtn>
                <NavigationBtn isDisabled={deletedPlans.length === 0} route={routes.trash} tooltipText="Deleted plans">
                    <FontAwesomeIcon icon={faTrashCan} />
                </NavigationBtn>
                <Btn onClick={addNewPlan}>
                    <FontAwesomeIcon icon={faPlus} width={16}/>
                    <span>plan</span>
                </Btn>
            </div>
        </div>
    )
}

export default PlansActionBar;