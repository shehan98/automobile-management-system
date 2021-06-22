import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import BtnRender from './BtnRender'
import axios from 'axios'

function VehicleItem({vehicle, token, callback, setCallback}) {

    const deleteVehicle = async() => {
        try {
            if(window.confirm('Are you sure you want to delete the selected vehicle')){
                const deleteImg = axios.post('/api/delete', {public_id: vehicle.images.public_id}, {
                    headers: {Authorization: token}
                })
                const deleteVehicle = axios.delete(`/api/vehicles/${vehicle._id}`, {
                    headers: {Authorization: token}
                })
    
                await deleteImg
                await deleteVehicle
                setCallback(!callback)
            }
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="vehicle-card">
            <img src={vehicle.images.url} alt="" />

            <div className="vehicle-box">
                <h2 title={vehicle.title}>{vehicle.brand}</h2>
                <span>{vehicle.model}</span>
                <p>{vehicle.color}</p>
            </div>

            <div className="row-btn">
            <Link id="btn-view" to={`/detail/${vehicle._id}`}>
                View more
            </Link>
            </div>

            

            <BtnRender vehicle={vehicle} deleteVehicle={deleteVehicle} />

        </div>
    )
}

export default VehicleItem
