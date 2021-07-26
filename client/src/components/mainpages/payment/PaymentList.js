import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './payment.css'
import moment from 'moment';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Dashboard from '../dashboard/Dashboard';

const Payment=props=>(
    <TableRow hover role="checkbox">
        <TableCell>{props.newPayment.firstName}</TableCell>
        <TableCell>{props.newPayment.email}</TableCell>
        <TableCell>
            <TableRow>{props.newPayment.vehicle.vehicle_id}</TableRow>
            <TableRow>{props.newPayment.vehicle.brand}</TableRow>
            <TableRow>{props.newPayment.vehicle.model}</TableRow>
            <TableRow>{props.newPayment.vehicle.color}</TableRow>
        </TableCell>
        <TableCell>{props.newPayment.method}</TableCell>
        <TableCell>{props.newPayment.amount}</TableCell>
        <TableCell>{props.newPayment.method == "Bank Payment" && <a href={props.newPayment.image1.url} download="front_side.jpg">< img src={props.newPayment.image1.url} width="225" height="150"/></a>}</TableCell>
        <TableCell>{props.newPayment.method == "Bank Payment" && <a href={props.newPayment.image2.url} download="back_side.jpg">< img src={props.newPayment.image2.url} width="225" height="150"/></a>}</TableCell>
        <TableCell>{moment(props.newPayment.createdAt).format('lll')}</TableCell>
    <TableCell>
    <a href=" " onClick={()=>{props.deletePayment(props.newPayment._id)}}><Button color="primary">Delete</Button></a>
    </TableCell>
    </TableRow>
)

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 700,
    },
});

const PaymentList = () => {

    const [payments, setPayments] = useState([])
    const [delPayment, setDelPayment] = useState([])
    const [slots, setSlots] = useState([])

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        axios.get('http://localhost:5000/api/payment/')
        .then(response => {
            setPayments(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const deletePayment = (id) => {
        axios.delete('http://localhost:5000/api/payment/'+id)
        .then(res=>console.log(res.data));

        setDelPayment({
            payments:payments.filter(el=>el._id!==id)
        })
    }

    const paymentList = () => {
        return payments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(currentPayment=>{
            return <Payment newPayment={currentPayment} deletePayment={deletePayment} key={currentPayment._id}/>;
        })
    };

        return (
            <div>
                <div><Dashboard/></div>
            <div>
                <h3 className="payment-topic">Payments List</h3>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead className="thead-light">
                                <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Vehicle Details </TableCell>
                                <TableCell>Method</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Front Side</TableCell>
                                <TableCell>Back Side</TableCell>
                                <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paymentList()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={payments.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
            </div>
        )
    
}

export default PaymentList;