import React, { useState, useEffect } from "react";
import "./dashboard.css";
import SensorChart from "./Chart";
import axios from "axios";
import moment from "moment";

function ChartActions(props) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
        {
            label: "Payment",
            data: [],
            backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            ],
        },
        ],
    });

    const [val, setVal] = useState([])

    useEffect(() => {
        axios
        .get('http://localhost:5000/api/payment/', {
            method: "GET",
        })
        .then((res) => {
            const labels = res.data.map((item) => moment(item.date).format('LLL'));
            const values = res.data.map((item) => item.amount);

            // const vehi1 = res.data.map((item) => item.vehicle.model);
            // console.log(vehi1)
            // const labels1 = new Set(vehi1)
            // console.log(labels1)

            // var counts = {}
            // const q = vehi1.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
            // console.log(q)

            const vehi1 = res.data.map((item) => item.vehicle);
            console.log(vehi1)



            

            const datasets = [
            {
                label: "Payment",
                data: values,
                backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(255, 99, 132, 0.6)",
                ],
            },
            ];
            setChartData({
            ...chartData,
            datasets,
            labels,
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    // const handleOnSelect = (event, data) => {
    //     axios
    //     .get(
    //         `http://localhost:8080/sensorreading/getAllReadings/${event.value}`,
    //         {
    //         method: "GET",
    //         }
    //     )
    //     .then((res) => {
    //         const labels = res.data.map((item) => moment(item.date).format('LLL'));
    //         const values = res.data.map((item) => item.value);
    //         const datasets = [
    //         {
    //             label: "Temperature",
    //             data: values,
    //             backgroundColor: [
    //             "rgba(255, 99, 132, 0.6)",
    //             "rgba(54, 162, 235, 0.6)",
    //             "rgba(255, 206, 86, 0.6)",
    //             "rgba(75, 192, 192, 0.6)",
    //             "rgba(153, 102, 255, 0.6)",
    //             "rgba(255, 159, 64, 0.6)",
    //             "rgba(255, 99, 132, 0.6)",
    //             ],
    //         },
    //         ];
    //         setChartData({
    //         ...chartData,
    //         datasets,
    //         labels,
    //         });
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // };

    return (
        <div>
        <SensorChart
            chartData={chartData}
            legendPosition="bottom"
        />
        </div>
    );
}

export default ChartActions;
