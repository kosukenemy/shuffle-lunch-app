import React, { useState, useEffect } from 'react';
import { FetchUserlistData } from '../API/API';

const Chat = () => {
    const [users , setUsers] = useState([]);
    const [chatInput ,setChatInput] = useState("");
    const [data , setData] = useState([]);


    useEffect(() => {
        const FetchAPI = async() => {
            setUsers(await FetchUserlistData() );
        }
        FetchAPI();
    },[])

    console.log("chatUser" , users)

    const pushChatData = {
        "content" : chatInput,
        "fromUser" : "本田",
        "toUser" : "松岡"
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        setData(chatInput)
        // インプット初期化
        setChatInput("");
        console.log(pushChatData)
    }
    
    return (
        <div>
            <div className="chat">
                {data}
            </div>
            <div className="chatbox">
                <form>
                    <input onChange={ (e) => setChatInput(e.target.value) } 
                            type="text" 
                            value={chatInput}
                    />
                    <button type="submit" onClick={handleSubmit}>送信</button>
                </form>
            </div>
        </div>
    )
}

export default Chat
