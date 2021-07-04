import { useEffect, useState } from "react";
import "./chatOnline.css"

export default function ChatOnline(onlineUsers, currentId, setCurrentChat) {

    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineBatch"></div>
                <span className="chatOnlineName">Shehan Tharuka</span>
            </div>

            <div className="chatOnlineFriend">
                <div className="chatOnlineBatch"></div>
                <span className="chatOnlineName">Shehan Tharuka</span>
            </div>

            <div className="chatOnlineFriend">
                <div className="chatOnlineBatch"></div>
                <span className="chatOnlineName">Shehan Tharuka</span>
            </div>
        </div>
    )
}