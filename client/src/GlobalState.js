import axios from 'axios'
import React, {createContext, useState, useEffect} from 'react'
import VehiclesAPI from './api/VehiclesAPI'
import UserAPI from './api/UserAPI'
import CategoriesAPI from './api/CategoriesAPI'

export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)

    

    useEffect(() =>{
        const refreshToken = async () =>{
            const res = await axios.get('/user/refresh_token')
    
            setToken(res.data.accesstoken)

            setTimeout(() => {
                refreshToken()
            }, 10 * 60 * 1000)
        }
            refreshToken()   
    },[])

    

    const state = {
        token: [token, setToken],
        VehiclesAPI: VehiclesAPI(),
        UserAPI: UserAPI(token),
        CategoriesAPI: CategoriesAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}