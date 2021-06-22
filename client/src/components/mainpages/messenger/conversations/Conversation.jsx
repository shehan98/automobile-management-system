import { useEffect, useState } from "react"
import "./conversation.css"
import axios from "axios"

export default function Conversation({conversation , currentUser}) {

    const [user, setUser] = useState(null)

    useEffect(()=>{
        const friendId = conversation.members.find(m=>m !== currentUser._id);

        const getUser = async ()=>{
            try {
                const res = await axios("/user?user.Id=" + friendId)
                setUser(res.data)
                console.log(res)
            } catch (err) {
                console.log(err);
            }
        };
        getUser()
    },[currentUser, conversation])

    return (
        <div className="conversation">
            <span className="conversationName">{user?.firstName}</span>
        </div>
    );
}