import "./message.css"
import {format} from "timeago.js"
import {useState} from 'react'
import axios from "axios"

export default function Message({message, own}) {

    const [user, setUser] = useState({})

    const getUser = async ()=>{
        try {
            const res = await axios(`/user/${message.sender}`)
            //console.log('data', res.data)
            setUser(res.data)
            //console.log(res)
        } catch (err) {
            console.log(err);
        }
    };
    getUser()

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <span className="messageName">{user.firstName}</span>
                <p className="messageText" >
                    {message.text}
                </p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}