import "./messenger.css"
import Conversation from "./conversations/Conversation"
import Message from "./message/Message"
//import ChatOnline from "./chatOnline/ChatOnline"
import { useContext, useEffect, useRef, useState } from "react"
import {GlobalState} from '../../../GlobalState'
import axios from "axios"
import {io} from "socket.io-client"

import {useParams} from 'react-router-dom'

export default function Messenger() {

    const state = useContext(GlobalState)
    //const user = state.UserAPI.users

    const [conversations, setConversations] = useState([]);

    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);

    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    //const [onlineUsers, setOnlineUsers] = useState([]);

    const socket = useRef();

    const params = useParams();
    const [user, setcurrentUser] = useState({});

    const scrollRef = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) =>{
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            console.log(users)
        })
    },[user]);

    useEffect(() =>{
        if(params){

            let userData = localStorage.getItem('user')
            let user = JSON.parse(userData)
            
            setcurrentUser(user)
        }
        
    }, [])

    //const {user} = useContext(users);
    //console.log(user);

    useEffect(()=>{
        const getConversations = async ()=>{
            try {
                const res = await axios.get(`api/conversations/${user._id}`);
                setConversations(res.data);
                //console.log(res);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user._id]);

    //console.log(currentChat)
    useEffect(()=>{
        const getMessages = async ()=>{
            try {
                const res = await axios.get("api/messages/"+currentChat?._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    },[currentChat]);

    //console.log(messages)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text:newMessage,
            conversationId: currentChat._id
        };

        const receiverId = currentChat.members.find((member)=> member !== user._id);

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });

        try {
            const res = await axios.post("api/messages", message);
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
                    (<>
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
                    </>) : (<span className="noConversationText">Open a conversation to start a chat.</span> )}
                </div>
            </div>
        </div>
    )
}