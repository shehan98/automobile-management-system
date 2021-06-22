import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'

function Favourite() {
    const state = useContext(GlobalState)
    const [favourite] = state.UserAPI.favourite

    if(favourite.length === 0)
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Wish list Empty</h2> 

    return (
        <div>
            {
                favourite.map(vehicle => (
                    <div className='detail'>
                        <img src={vehicle.images.url} alt='' />
                        <div className='box-detail'>
                            <div className='row'>
                                <h2>{vehicle.brand}</h2>
                                <h4>{vehicle.model}</h4>   
                            </div>
                            <div className='row'>
                                <label>Color:</label>
                                <span>{vehicle.color}</span>
                            </div>
                            <div className='row'>
                                <label>Grade:</label>
                                <p>{vehicle.grade}</p>
                            </div>
                            <div className='row'>
                                <label>Transmission:</label>
                                <p>{vehicle.gear}</p>
                            </div>
                            <div className='row'>
                                <label>Year of Manufacture:</label>
                                <p>{vehicle.manu_yr}</p>
                            </div>
                            <div className='row'>
                                <label>Country of Origin:</label>
                                <p>{vehicle.origin_country}</p>
                            </div>
                            <div className='row'>
                                <label>Engine Capacity (cc):</label>
                                <p>{vehicle.cylinder_cap}</p>
                            </div>
                            <div className='row'>
                                <label>Description:</label>
                                <p>{vehicle.desc}</p>
                            </div>
                            
                            <Link to='/' className='buy'>Buy</Link>
                            <Link to='/detail/request-price' className='req_price'>Request the Price</Link>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Favourite
