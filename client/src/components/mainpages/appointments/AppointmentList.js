import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './appointment.css';


import Dashboard from '../dashboard/Dashboard';

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

import Doc from './DocServiceAppo';
import PdfContainer from './PdfContainerAppo';

const createPdf = (html) => Doc.createPdf(html);


const Appointment=props=>(
    <TableRow hover role="checkbox">
        <TableCell>{props.newAppointment.email}</TableCell>
        <TableCell>{props.newAppointment.name}</TableCell>
        <TableCell>{props.newAppointment.tel}</TableCell>
        <TableCell>{props.newAppointment.slot && props.newAppointment.slot.slotDate}</TableCell>
        <TableCell>{props.newAppointment.slot && props.newAppointment.slot.slotTime}</TableCell>
    <TableCell>
    <a href=" " onClick={()=>{props.deleteAppointment(props.newAppointment._id)}}><Button color="primary">Delete</Button></a>
    </TableCell>
    </TableRow>
)

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 540,
    },
    body: {
        fontSize: '16pt',
    },
});

const AppointmentList = () => {

    const [appointments, setAppointments] = useState([])
    const [delAppointment, setDelAppointment] = useState([])
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
        axios.get('http://localhost:5000/api/appointments/')
        .then(response => {
            setAppointments(response.data)
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const deleteAppointment = (id) => {
        axios.delete('http://localhost:5000/api/appointments/'+id)
        .then(res=>console.log(res.data));

        setDelAppointment({
            appointments:appointments.filter(el=>el._id!==id)
        })
    }

    const appointmentList = () => {
        return appointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(currentAppointment=>{
            return <Appointment newAppointment={currentAppointment} deleteAppointment={deleteAppointment} key={currentAppointment._id}/>;
        })
    };

        return (
            <div className="appointment">
                <div><Dashboard /></div>
                <PdfContainer createPdf={createPdf}>
                    <h3 className="appointment-topic">Appointments List</h3>
                    <Paper className={classes.root} >
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead className="thead-light">
                                    <TableRow>
                                    <TableCell className={classes.body}>Email</TableCell>
                                    <TableCell className={classes.body}>Name</TableCell>
                                    <TableCell className={classes.body}>Contact Number </TableCell>
                                    <TableCell className={classes.body}>Allotted Date</TableCell>
                                    <TableCell className={classes.body}>Time Slot </TableCell>
                                    <TableCell className={classes.body}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className={classes.body}>
                                    {appointmentList()}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={appointments.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </PdfContainer>

            </div>
        )
    
}

export default AppointmentList;