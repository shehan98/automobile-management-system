import React, {useContext, useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import './profile.css'
import Button from '@material-ui/core/Button';
import background from "../../../images/background1.jpg"
import axios from 'axios';
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

const Payment=props=>(
    <TableRow hover role="checkbox">
        <TableCell>
            <TableRow>
                <TableCell>{props.newPayment.vehicle.brand}</TableCell>
                <TableCell>{props.newPayment.vehicle.model}</TableCell>
                <TableCell>{props.newPayment.vehicle.color}</TableCell>
                <TableCell>{props.newPayment.vehicle.manu_yr}</TableCell>
            </TableRow>
        </TableCell>
        <TableCell>{props.newPayment.method}</TableCell>
        <TableCell>{props.newPayment.amount}</TableCell>
        <TableCell>{moment(props.newPayment.createdAt).format('lll')}</TableCell>
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

function Profile() {
    
    const params = useParams()
    const state = useContext(GlobalState)
    const users = state.UserAPI.users
    const [isAdmin] = state.UserAPI.isAdmin
    const [currentUser, setcurrentUser] = useState({})
    const [token] = state.token

    const [onEditProfile, setOnEditProfile] = useState(false)

    const [payments, setPayments] = useState([])
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [paymentsR, setPaymentsR] = useState([])

    const history = useHistory()

    useEffect(() =>{
        if(params){

            let userData = localStorage.getItem('user')
            let user = JSON.parse(userData)
            
            setcurrentUser(user)
        }
        
    }, [])

    //const handleChangeUpdate = () => setOnEditProfile(onEditProfile)
    
    const handleChangeInput = e =>{
        const {name, value} = e.target
        setcurrentUser({...currentUser, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault(e)
        try {
            await axios.put(`/user/profile/${currentUser._id}`, {...currentUser}, {headers: {Authorization: token}})
            setOnEditProfile(false)
            //window.alert("Profile Updated Successfully!")
            //history.push('/')
        } catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        //axios.get('http://localhost:5000/api/payment/')
        axios.get('http://localhost:5000/api/onepayment/' + currentUser._id)
        .then(response => {
            if(response.length !== 1 && response === null){setPayments(response.data)}
            console.log(response.data)
            
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    // useEffect(() => {
    //     axios.get('http://localhost:5000/api/payment/')
    //     .then(response => {
    //         response.forEach(transaction => {
    //             if(transaction.user_id === currentUser._id){
    //                 setPaymentsR(transaction)
    //                 console.log(transaction)
    //             }
    //         })
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // }, []);

    // useEffect(() => {
    //     payments.forEach(transaction => {
    //         if(transaction.user_id === currentUser._id){
    //             setPaymentsR(transaction)
    //         }
    //     })
    // },[payments])
    // console.log(paymentsR)

    const paymentList = () => {
        return payments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(currentPayment=>{
            return <Payment newPayment={currentPayment} key={currentPayment._id}/>;
        })
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <div className={isAdmin ?'profile-detail-admin' : 'profile-detail'}>
                <form className="profile-form" onSubmit={handleSubmit}>
                <h1>Profile</h1>
                <div className='profile-row'>
                    <label className="profile-label">NIC: </label>
                    <p className="profile-value">{currentUser.nic}</p>
                </div>
                <div className='profile-row'>
                    <label className="profile-label">Email: </label>
                    <p className="profile-value">{currentUser.email}</p>
                </div>
                <div className='profile-row'>
                    <label className="profile-label">First Name: </label>
                    {onEditProfile?
                    <input type="text" name="firstName" value={currentUser.firstName} onChange={handleChangeInput}/>
                    :
                    <p className="profile-value">{currentUser.firstName}</p>
                    }
                </div>
                <div className='profile-row'>
                    <label className="profile-label">Last Name: </label>
                    {onEditProfile?
                    <input type="text" name="lastName" value={currentUser.lastName} onChange={handleChangeInput}/>
                    :
                    <p className="profile-value">{currentUser.lastName}</p>
                    }
                </div>
                <div className='profile-row'>
                    <label className="profile-label">Contact Number: </label>
                    {onEditProfile?
                    <input type="text" name="contactNumber" value={currentUser.contactNumber} onChange={handleChangeInput}/>
                    :
                    <p className="profile-value">{currentUser.contactNumber}</p>
                    }
                </div>
                <div className='profile-row'>
                    <label className="profile-label">Address: </label>
                    {onEditProfile?
                    <input type="text" name="address" value={currentUser.address} onChange={handleChangeInput}/>
                    :
                    <p className="profile-value">{currentUser.address}</p>
                    }
                </div>

                <div className="profile-btn">
                {onEditProfile?
                <Button variant="contained" color="primary" onClick={handleSubmit} className="profile-update">Submit</Button>
                :
                <Button variant="contained" color="primary" onClick={() =>setOnEditProfile(true)} className="profile-update">Update</Button>
                }
                </div>
                
                </form>
            </div>

            {isAdmin ? "" : (
            <div className="payment-history">
                <h3 className="phistory-topic">Payments History</h3>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead className="thead-light">
                                <TableRow>
                                <TableCell>Vehicle Details </TableCell>
                                <TableCell>Method</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Date</TableCell>
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
            )}
        </div>
    )
}

export default Profile