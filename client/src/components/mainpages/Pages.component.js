import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './welcomePage/WelcomePage.component'
import Vehicles from './vehicles/Vehicles.component'
import DetailVehicle from './detailVehicle/DetailVehicle.component'
import Register from './auth/Register'
import Login from './auth/Login'
import NotFound from './utils/NotFound/NotFound'
import Categories from './categories/Categories.component'
import CreateVehicle from './createVehicle/CreateVehicle.component'
import Profile from './profile/Profile.component'
import Contact from './contact/Contact.component'
import RequestPrice from './detailVehicle/RequestPrice'
import Messenger from './messenger/Messenger'
import Favourite from './favourite/Favourite'
import PaymentMenu from './payment/PaymentMenu'
import Paypal from './payment/Paypal'
import PaymentList from './payment/PaymentList'

import StepperApp from './notifications/StepperApp'
import CreateNotification from './notifications/CreateNotification'
import NotificationList from './notifications/NotificationList'

import AppointmentForm from './appointments/AppointmentForm';
import CalendarView from './appointments/CalenderView';
import AppointmentList from './appointments/AppointmentList'

import About from './about/about'

import Dashboard from './dashboard/Dashboard'

import ChartActions from './dashboard/ChartActions'

import {GlobalState} from '../../GlobalState'

function Pages() {
    const state = useContext(GlobalState)
    const [isAdmin] = state.UserAPI.isAdmin

    return (
        <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/menu" exact component={Vehicles} />
                <Route path="/detail/:id" exact component={DetailVehicle} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/contact-us" exact component={Contact} />
                <Route path="/detail/request-price" exact component={RequestPrice} />
                <Route path="/fav" exact component={Favourite} />
                <Route path="/payment/:id" exact component={PaymentMenu} />
                <Route path="/payment/paypal" exact component={Paypal} />
                <Route path="/payment-list" exact component={PaymentList} />

                <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
                <Route path="/create_vehicle" exact component={isAdmin ? CreateVehicle : NotFound} />
                <Route path="/edit_vehicle/:id" exact component={isAdmin ? CreateVehicle : NotFound} />

                <Route path="/messenger" exact component={Messenger} />

                <Route path="/not-step" exact component={StepperApp} />
                <Route path="/create-notification" exact component={CreateNotification} />
                <Route path="/notifications" exact component={NotificationList} />

                <Route exact path='/calender' component={CalendarView} />
                <Route exact path='/create-appt' component={AppointmentForm} />
                <Route exact path='/appointment-list' component={AppointmentList} />

                <Route exact path='/about-us' component={About} />

                <Route exact path='/dashboard' component={Dashboard} />

                <Route exact path='/charts' component={ChartActions} />

                <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
