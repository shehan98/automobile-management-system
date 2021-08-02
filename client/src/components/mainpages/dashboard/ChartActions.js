import React, { useState, useEffect } from "react";
import "./dashboard.css";
import SensorChart from "./Chart";
import axios from "axios";
import moment from "moment";

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

function ChartActions(props) {

    const [show, setShow] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const paypalMethod = "Paypal";
    const bankMethod = "Bank Payment";

    const handleClosePaypal = () => {
        setAnchorEl(null);
        setShow(true)
    };

    const handleCloseBank = () => {
        setAnchorEl(null);
        setShow(false)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


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

    const [chartDataBank, setChartDataBank] = useState({
        labelsBank: [],
        datasetsBank: [
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

    useEffect(() => {
        axios
        .get('http://localhost:5000/api/payment/', {
            method: "GET",
        })

        .then((res) => {

            const labels = res.data.map((item) => moment(item.date).format('LLL'));
            const values = res.data.map(
                (item) => 
                {if(item.method !== "Paypal"){
                    return item.amount
                }
                });

            const labelsBank = res.data.map((item) => moment(item.date).format('LLL'));
            const valuesBank = res.data.map(
                (item) => 
                {if(item.method === "Bank Payment"){
                    return item.amount
                }
                });

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

            const datasetsBank = [
                {
                    label: "Payment",
                    data: valuesBank,
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
            setChartDataBank({
                ...chartDataBank,
                datasetsBank,
                labelsBank,
            });
            console.log(chartData)
            console.log(chartDataBank)
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <div>

            <div className="wrapper">
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    Select Payment Method
                </Button>
                <MenuList
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleCloseBank} name="method" value="Bank Payment">Bank Payment</MenuItem>
                    <MenuItem onClick={handleClosePaypal} name="method" value="Paypal">Paypal</MenuItem>
                </MenuList>
            </div>

        <SensorChart
            chartData={chartData}
            legendPosition="bottom"
        />

        </div>
    );
}

export default ChartActions;
