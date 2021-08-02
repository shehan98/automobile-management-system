import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import VehicleItem from '../utils/vehicleItem/VehicleItem.component'
import RequestDialog from './RequestDialog'

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import { IconButton } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '99%',
        margin: '10px 10px 0 10px',
            '& > * + *': {
                marginTop: theme.spacing(2),
        },
    },
    }))

function DetailVehicle(vehicle) {
    const params = useParams()
    const state = useContext(GlobalState)
    const [vehicles] = state.VehiclesAPI.vehicles
    const [detailVehicle, setDetailVehicle] = useState([])
    const addFavourite = state.UserAPI.addFavourite

    const [isAdmin] = state.UserAPI.isAdmin
    const [isLogged] = state.UserAPI.isLogged

    const [open, setOpen] = useState(true);
    const classes = useStyles();

    useEffect(() =>{
        if(params){
            vehicles.forEach(vehicle => {
                if(vehicle._id === params.id) setDetailVehicle(vehicle)
            })
        }
    }, [params, vehicles])

    if(detailVehicle.length === 0){
        return null;
    }

    return (
        <div>

            {isLogged? "" :
                <div className={classes.root}>
                    <Collapse in={open}>
                        <Alert action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                    </IconButton>
                            }
                        severity="info">
                            If you want to purchase this vehicle, please login with your account!
                        </Alert>
                    </Collapse>
                </div>
            }

            <div className='detail'>
                <img src={detailVehicle.images.url} alt='' />
                <div className='box-detail'>
                    <div className='row'>
                        <h2>{detailVehicle.brand}</h2>
                        <h4>{detailVehicle.model}</h4>   
                    </div>
                    <div className='row'>
                        <label>Color:</label>
                        <span>{detailVehicle.color}</span>
                    </div>
                    <div className='row'>
                        <label>Grade:</label>
                        <p>{detailVehicle.grade}</p>
                    </div>
                    <div className='row'>
                        <label>Transmission:</label>
                        <p>{detailVehicle.gear}</p>
                    </div>
                    <div className='row'>
                        <label>Year of Manufacture:</label>
                        <p>{detailVehicle.manu_yr}</p>
                    </div>
                    <div className='row'>
                        <label>Country of Origin:</label>
                        <p>{detailVehicle.origin_country}</p>
                    </div>
                    <div className='row'>
                        <label>Engine Capacity (cc):</label>
                        <p>{detailVehicle.cylinder_cap}</p>
                    </div>
                    <div className='row'>
                        <label>Description:</label>
                        <p>{detailVehicle.desc}</p>
                    </div>
                    
                    {isAdmin ? "" : 
                        onclick=isLogged ? (<Link to={`/payment/${detailVehicle._id}`} className='buy'>PAY</Link>) : ""
                    }
                    <div className='req_price'><RequestDialog/></div>
                    {/* {isAdmin ? "" : (
                    <Link to='#!' onClick={() => addFavourite(vehicle)} className='fav'>
                            <i class="far fa-heart"/>
                    </Link>
                    )}         */}
                </div>
            </div>

            <div>
                <h2 className="rel-vehicle">Related Vehicles</h2>
                <hr />
                <div className='vehicles'>
                    {
                        vehicles.map(vehicle => {
                            return vehicle.brand === detailVehicle.brand
                                ? <VehicleItem key={vehicle._id} vehicle={vehicle} /> : null
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default DetailVehicle
