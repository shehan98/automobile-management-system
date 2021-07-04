import React, {useContext, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {GlobalState} from '../../../GlobalState';

import axios from 'axios';

export default function RequestDialog() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const params = useParams()
  const state = useContext(GlobalState)
  const [vehicles] = state.VehiclesAPI.vehicles
  const [detailVehicle, setDetailVehicle] = useState([])

  useEffect(() =>{
    if(params){
        vehicles.forEach(vehicle => {
            if(vehicle._id === params.id) setDetailVehicle(vehicle)
        })
    }
  }, [params, vehicles])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const emailChange = e =>{
    let reqEmail = {...email}
    reqEmail = e.target.value
    setEmail(reqEmail)
    console.log(reqEmail)
  }

  const emailSubmit =(e) =>{
    e.preventDefault();

    let vehicle_id = detailVehicle.vehicle_id
    let brand = detailVehicle.brand
    let model = detailVehicle.model
    let color = detailVehicle.color
    let grade = detailVehicle.grade
    let gear = detailVehicle.gear
    let manu_yr = detailVehicle.manu_yr
    let cylinder_cap = detailVehicle.cylinder_cap

    let data = {
        email, vehicle_id, brand, model, color, grade, gear, manu_yr, cylinder_cap
    }

    axios.post('/api/requestprice', data)
    .then(res=>{
        this.setState({
            sent:true,
        },this.resetForm())
    }).catch(()=>{
        console.log('message not sent');
    })
    setOpen(false);
}

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Request the Price
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Request the price</DialogTitle>
        <DialogContent>
          <h2>{detailVehicle.brand} {detailVehicle.model}</h2>
          <DialogContentText>
            Please enter your email in the box given below to inform you our unbelievable price.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            value={email}
            type="email"
            fullWidth
            onChange={emailChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={emailSubmit} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}