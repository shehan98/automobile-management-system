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

import AppointmentForm from './appointments/AppointmentForm';
import CalendarView from './appointments/CalenderView';

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
                <Route path="/payment" exact component={PaymentMenu} />
                <Route path="/payment/paypal" exact component={Paypal} />

                <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
                <Route path="/create_vehicle" exact component={isAdmin ? CreateVehicle : NotFound} />
                <Route path="/edit_vehicle/:id" exact component={isAdmin ? CreateVehicle : NotFound} />

                <Route path="/messenger" exact component={Messenger} />

                <Route exact path='/calender' component={CalendarView} />
                <Route exact path='/create-appt' component={AppointmentForm} />

                <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
