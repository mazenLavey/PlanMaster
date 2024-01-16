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

const BarChart: React.FC<Props> = ({
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
            borderWidth: 0,
            }],
    };

    const options = {
        aspectRatio: 1.15,
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            y: {
                border: {
                    dash: [3, 3]
                },
                ticks: {
                    stepSize: 1,
                }
            },
            x: {
                grid: {
                    display: false,
                }
            }
        },
        elements: {
            bar: {
                borderRadius: 8,
            }
        }
    }

    return(
    <div className={classNames("BarChart", {className})}>
        <h2>{title}</h2>
        <Chart type="bar" data={chartData} options={options}/>
    </div>
    )
}

export default BarChart;