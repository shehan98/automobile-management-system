import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import VehicleItem from '../utils/vehicleItem/VehicleItem.component'
import RequestDialog from './RequestDialog'

function DetailVehicle(vehicle) {
    const params = useParams()
    const state = useContext(GlobalState)
    const [vehicles] = state.VehiclesAPI.vehicles
    const [detailVehicle, setDetailVehicle] = useState([])
    const addFavourite = state.UserAPI.addFavourite

    const [isAdmin] = state.UserAPI.isAdmin

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
                    
                    {isAdmin ? "" : (
                    <Link to='/' className='buy'>Buy</Link>
                    )}
                    <div className='req_price'><RequestDialog/></div>
                    {isAdmin ? "" : (
                    <Link to='#!' onClick={() => addFavourite(vehicle)} className='fav'>
                            <i class="far fa-heart"/>
                    </Link>
                    )}        
                </div>
            </div>

            <div>
                <h2>Related Vehicles</h2>
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
