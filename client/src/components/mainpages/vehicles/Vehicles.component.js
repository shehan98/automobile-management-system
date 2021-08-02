import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import VehicleItem from '../utils/vehicleItem/VehicleItem.component'
import Filters from './Filters'
import SeeMore from './SeeMore'

function Vehicles() {
    const state = useContext(GlobalState)
    const [vehicles] = state.VehiclesAPI.vehicles
    const [isAdmin] = state.UserAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.VehiclesAPI.callback

    console.log(vehicles)

    return (
        <div>
            <div className="filter-line"><Filters /></div>
            <div className="vehicles">
            {
                vehicles.map(vehicle => {
                    return <VehicleItem  key={vehicle._id} vehicle={vehicle} isAdmin={isAdmin} token={token} callback={callback} setCallback={setCallback} />
                })
            }
            </div>
            <><SeeMore /></>
        </div>
        
    )
}

export default Vehicles