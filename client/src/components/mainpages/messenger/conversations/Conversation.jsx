import { useEffect, useState } from "react"
import "./conversation.css"
import axios from "axios"

export default function Conversation({conversation , currentUser}) {

    const [user, setUser] = useState({})

    /*
    useEffect(()=>{
        const friendId = conversation.members.find(m=>m !== currentUser._id);
        console.log("fid", friendId)
        const getUser = async ()=>{
            try {
                const res = await axios(`/user/${friendId}`)
                //console.log('data', res.data)
                setUser(res.data)
                //console.log(res)
            } catch (err) {
                console.log(err);
            }
        };
        getUser()
    },[currentUser, conversation])
    */

    const friendId = conversation.members.find(m=>m !== currentUser._id);
    console.log("fid", friendId)
    const getUser = async ()=>{
        try {
            const res = await axios(`/user/${friendId}`)
            //console.log('data', res.data)
            setUser(res.data)
            //console.log(res)
        } catch (err) {
            console.log(err);
        }
    };
    getUser()

    return (
        <div className="conversation">
            <span className="conversationName">{user.firstName} {user.lastName}</span>
        </div>
    );
}