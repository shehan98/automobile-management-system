import "./message.css"
import {format} from "timeago.js"

export default function Message({message, own}) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <span className="messageName">Shehan</span>
                <p className="messageText" >
                    {message.text}
                </p>
            </div>
            <div className="messageBottom">{format(message.createAt)}</div>
        </div>
    )
}