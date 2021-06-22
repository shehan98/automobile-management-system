import "./messenger.css"
import Conversation from "./conversations/Conversation"
import Message from "./message/Message"
import ChatOnline from "./chatOnline/ChatOnline"
import { useContext, useEffect, useRef, useState } from "react"
import {GlobalState} from '../../../GlobalState'
import axios from "axios"

export default function Messenger() {

    const state = useContext(GlobalState)
    const user = state.UserAPI.users

    const [conversations, setConversations] = useState([]);

    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);

    const [newMessage, setNewMessage] = useState("");

    //const {user} = useContext(users);
    //console.log(user);

    const scrollRef = useRef();

    useEffect(()=>{
        const getConversations = async ()=>{
            try {
                const res = await axios.get("/conversations/"+user._id);
                setConversations(res.data);
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user._id]);

    useEffect(()=>{
        const getMessages = async ()=>{
            try {
                const res = await axios.get("/messages/"+currentChat?._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }   
        };
        getMessages();
    },[currentChat]);

    console.log(messages)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text:newMessage,
            conversationId: currentChat._id
        };

        try {
            const res = await axios.post("/messages", message);
            setMessages([...messages, res.data])
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth"});
    }, [messages]);

    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search for friends" className="chatMenuInput" />
                    {conversations.map((c) => (
                        <div onClick={() => setCurrentChat(c)}>
                            <Conversation conversation={c} currentUser={user} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {
                        currentChat ? 
                    <>
                    <div className="chatBoxTop">
                        {messages.map((m) => (
                            <div ref={scrollRef}>
                                <Message message={m} own={m.sender === user._id}/>
                            </div>
                        ))}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea 
                            className="chatMessageInput" 
                            placeholder="write something..."
                            onChange={(e)=>setNewMessage(e.target.value)}
                            value={newMessage}
                            >

                            </textarea>
                        <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                    </div>
                    </> : <span className="noConversationText">Open a conversation to start a chat.</span> }
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline />
                </div>
            </div>
        </div>
    )
}