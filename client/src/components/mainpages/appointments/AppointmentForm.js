import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Form, Input, DatePicker, Switch, Button, Radio, } from 'antd';
import './appointment.css';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const AppointmentForm = (props) => {
  const [input, setInput] = useState({
    email: '',
    name: '',
    tel: '',
    slotTime: '',
    slotDate: ''
  })
  const [AM, setAM] = useState(true);
  const [error, setError] = useState('')

  const slotsAM = ['8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00'];
  const slotsPM = ['1:00-2:00', '2:00-3:00', '3:00-4:00', '4:00-5:00'];
  const baseUrl = 'http://localhost:5000';

  const changeHandler = event => {
    setError('');
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  }

  const switchHandler = () => {
    setError('');
    setAM(!AM);
  }

  const dateHandler = (date, datestring) => {
    setError('');
    setInput({
      ...input, 
      slotDate: date
    })
  }

  const validateInput = () => {
    if (!input.email || !input.name || !input.tel || !input.slotTime || !input.slotDate) {
      setError('All fields are required');
      return false;
    } else {
      return true;
    }
  }

  const submitHandler = event => {
    event.preventDefault();
    if (validateInput()) {
      axios.post(`${baseUrl}/api/appointments`, input)
        .then(response => {
          console.log('success adding appointment:', response);
          setInput({
            email: '',
            name: '',
            tel: '',
            slotTime: '',
            slotDate: ''
          })
          props.history.push('/');
        })
        .catch(error => {
          console.log('error adding appointment:', error);
        })
    }
  }

  return (
    <div>
    <div><span className="calender-topic">Add Appointment</span></div>
    <div className="appointment-btn">
        <Link to='/calender'>
            <IconButton color="primary" aria-label="delete" size="large">
                <ArrowBackIcon fontSize="inherit" />
            </IconButton>
        </Link>
    </div>
    <Form className='appt-form' onSubmit={submitHandler}>
      <Input name='email' value={input.email} placeholder='Email' type='email' onChange={changeHandler} />
      <Input name='name' value={input.firstName} placeholder='Full Name' type='text' onChange={changeHandler} />
      <Input name='tel' value={input.lastName} placeholder='Contact Number' type='number' onChange={changeHandler} />
      <Switch checkedChildren="AM" unCheckedChildren="PM" defaultChecked onChange={switchHandler}/>
      {AM ? (
        <Radio.Group name='slotTime' value={input.slotTime} onChange={changeHandler}>
          {slotsAM.map(item => <Radio key={item} value={`${item} AM`}>{`${item} AM`}</Radio>)}
        </Radio.Group>
      ) : (
        <Radio.Group name='slotTime' value={input.slotTime} onChange={changeHandler}>
          {slotsPM.map(item => <Radio key={item} value={`${item} PM`}>{`${item} PM`}</Radio>)}
        </Radio.Group>
      )}
      <DatePicker onChange={dateHandler}/>
      {error && <div>{error}</div>}
      <Button onClick={submitHandler}>Submit</Button>
    </Form>
    </div>
  )
}

export default withRouter(AppointmentForm);