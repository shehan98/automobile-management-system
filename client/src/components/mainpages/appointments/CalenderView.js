import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Calendar } from 'antd';
import './appointment.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import Dashboard from '../dashboard/Dashboard';

import { Label } from 'semantic-ui-react'


const CalendarView = () => {
  const [slots, setSlots] = useState([]);
  const [displayDate, setDisplayDate] = useState(moment().format('MM-DD-YYYY'));
  const state = useContext(GlobalState)
  const [isAdmin] = state.UserAPI.isAdmin

  const baseUrl = 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${baseUrl}/api/slots`)
      .then(response => {
        console.log('fetching slots success: ', response);
        setSlots(response.data);
      })
      .catch(error => {
        console.log('fetching slots error: ', error);
      })
  }, []);

  const filterListDate = value => {
    return slots.filter(item => Number(item.slotDate.split('-')[1]) === value.date() && item.slotDate.slice(0, 2) === displayDate.slice(0, 2) && item.slotDate.slice(6) === displayDate.slice(6));
  }

  const dateCellRender = value => {
    let data = filterListDate(value);

    return (
      <ul>
        {data.map(item => <li key={item._id}>{item.slotTime}<Label as='a' color='red' tag className="booked-label">Booked</Label></li>)}
      </ul>
    )
  }

  const filterListMonth = value => {
    return slots.filter(item => Number(item.slotDate.split('-')[0]) === value.month() + 1 && item.slotDate.slice(6) === displayDate.slice(6));
  }

  const monthCellRender = value => {
    let data = filterListMonth(value);

    if (data.length > 0) {
      return (
        <div>{`${data.length} appointments total`}</div>
      )
    }
  }

  const onPanelChange = value => {
    setDisplayDate(moment(value).format('MM-DD-YYYY'));
  }

  return (
    <div className="calendar">
      <div className="calendar-box">
        <div><span className="calender-topic">Appointments Calender</span></div>
        {isAdmin? "" :
          (<div className="appointment-btn">
            <Link to='/create-appt'>
                <Button variant="contained" color="primary">Add Appointment</Button>
            </Link>
          </div>)
        }
    </div>
        {isAdmin? 
          (<div><div className="dash-admin"><Dashboard/></div>
          <Calendar className="calender" dateCellRender={dateCellRender} monthCellRender={monthCellRender} onPanelChange={onPanelChange} /></div>)
          :
          (<Calendar className="calender" dateCellRender={dateCellRender} monthCellRender={monthCellRender} onPanelChange={onPanelChange} />)
        }
    </div>
  )
} 

export default CalendarView;