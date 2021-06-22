import React, {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {

    const [users, setUsers] = useState([])

    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const [favourite, setFavourite] = useState([])

useEffect(() =>{
    if(token){
        const getUser = async () =>{
            try {
                const res = await axios.get('/user/infor', {
                    headers: {Authorization: token}
                })
                
                setIsLogged(true)
                res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                
            }catch (err) {
                alert(err.response.data.msg)
            }
        }

        getUser()



        const getUsers = async () => {
            try {
                const res = await axios.get('/user/infor', {
                    headers: {Authorization: token}
                })
                setUsers(res.data.users)
            }catch (err) {
                alert(err.response.data.msg)
            }
        }
        getUsers()

    }
},[token])

const addFavourite = async (vehicle) => {
    if(!isLogged) return alert("Please login to continue")

    const check = favourite.every(item =>{
        return item._id !== vehicle._id
    })

    if(check){
        setFavourite([...favourite, {...vehicle, quantity: 1}])

        await axios.patch('/user/addFavourite', {favourite: [...favourite, {...vehicle, quantity: 1}]}, {
            headers: {Authorization: token}
        })

    }else{
        alert("This product has been added to Wish list.")
    }
}

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],

        users: [users, setUsers],

        favourite: [favourite, setFavourite],
        addFavourite: addFavourite
    }
}

export default UserAPI
