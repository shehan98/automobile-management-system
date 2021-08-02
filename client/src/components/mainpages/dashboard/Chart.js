import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import "./dashboard.css";

function SensorChart(props) {
    const { displayTitle, displayLegend, legendPosition, chartData } = props;

    return (
        <div className="chart">
            <div className="chart-box">
                <label className="label-1">Monthly Payment Summary</label>
                <Bar
                    data={chartData}
                    options={{
                    title: {
                        display: displayTitle,
                        text: "Past Sensor Data - ",
                        fontSize: 25,
                    },
                    legend: {
                        display: displayLegend,
                        position: legendPosition,
                    },
                    }}
                />
            </div>

            <div className="chart-box-2">
                <Line
                    data={chartData}
                    options={{
                    title: {
                        display: displayTitle,
                        text: "Past Sensor Data - ",
                        fontSize: 25,
                    },
                    legend: {
                        display: displayLegend,
                        position: legendPosition,
                    },
                    }}
                />
            </div>

            <div className="chart-box-3">
                <Pie
                    data={chartData}
                    options={{
                    title: {
                        display: displayTitle,
                        text: "Past Sensor Data - ",
                        fontSize: 25,
                    },
                    legend: {
                        display: displayLegend,
                        position: legendPosition,
                    },
                    }}
                />
            </div>

        </div>
    );
}

export default SensorChart;
