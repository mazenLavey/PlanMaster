import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import classNames from 'classnames';
import "./index.scss";

type Props = {
    className?: string,
    title: string,
    data: number[],
    labels: string[],
    colors: string[],
}

const DoughnutChart: React.FC<Props> = ({
    title, 
    data, 
    labels, 
    colors, 
    className
}) => {

    const chartData =  {
        labels: labels,
        datasets: [{
            label: ' Total',
            data: data,
            backgroundColor: colors,
            borderWidth: 4,
            borderColor: "white",
            hoverBorderColor: "white",
            borderRadius: 8,

        }],
    };

    return(
    <div className={classNames("DoughnutChart", {className})}>
        <h2>{title}</h2>
        <Chart type="doughnut" data={chartData}/>
    </div>
    )
}

export default DoughnutChart;