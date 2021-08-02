import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import './vehicles.css'
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function SeeMore() {
    const state = useContext(GlobalState)
    const [page, setPage] = state.VehiclesAPI.page
    const [result] = state.VehiclesAPI.result

    return (
        <div className="see_more">
            {
                result < page * 2 ? "" : <Button className="see_more_btn" onClick={() => setPage(page+1)} endIcon={<ExpandMoreIcon/>}>See more</Button>
            }
        </div>
    )
}

export default SeeMore
