import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({vehicle, deleteVehicle}) {
    
    const state = useContext(GlobalState)
    const [isAdmin] = state.UserAPI.isAdmin
    
    return (
        <div className="row_btn">
            {
                isAdmin ?
                <>
                    <Link id="btn_admin_delete" to="#!" onClick={() =>deleteVehicle(vehicle._id, vehicle.images.public_id)}>
                        Delete
                    </Link>
                    <Link id="btn_admin_update" to={`/edit_vehicle/${vehicle._id}`}>
                        Update
                    </Link>
                </>
                :<>
                </>
            }
        </div>
    )
}

export default BtnRender