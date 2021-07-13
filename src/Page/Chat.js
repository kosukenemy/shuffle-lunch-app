import React, { useState, useEffect, useContext } from 'react';
import { FetchUserlistData , FetchChatlistData } from '../API/API';
import { FetchUser } from '../../src/App'
import { useParams } from 'react-router';
import { db } from '../API/Firebase';
import firebase from 'firebase';
import { UserIcon } from '../Style/Style';

const Chat = () => {
    
    let { id } = useParams();
    const thisUser = useContext(FetchUser);
    const [user , setUser] = useState([]);
    const [chatInput ,setChatInput] = useState("");
    const [chatData , SetChatData] = useState([]);


    // 自分のデータ
    const matchUser = user.filter( u => u.id === id );
    // 自分のデータの画像
    const myPic = thisUser.filter( u => u.profile_image ).map( u => u.profile_image );
    // トークするユーザーid
    const talkToUserID = matchUser.filter( t => t.id ).map( t => t.id)
    // 自分のID
    const myUserID = thisUser.filter( t => t.id ).map( t => t.id);


    useEffect(() => {
        const FetchAPI = async() => {
            setUser(await FetchUserlistData(id) );
            SetChatData(await FetchChatlistData() );
        }
        FetchAPI();
    },[id])


    const sendData = {
        contents : chatInput,
        toUser : talkToUserID[0],
        fromUser : myUserID[0],
        image : myPic[0]
    }
    
    const ChatData = async() => {
        try {
/*             const chatRef = db.collection('chatlist').doc("j1hZ5JnpAOTBxTn6bJHR")
            await chatRef.update({
                chat: firebase.firestore.FieldValue.arrayUnion(...sendData)
            }) */
            const chatRef = db.collection('chatlist')
            await chatRef.add(sendData)
        } catch (err) {
            console.log(`Error: ${JSON.stringify(err)}`)
        }
    }




    const handleSubmit = (e) => {
        e.preventDefault();
        // インプット初期化
        setChatInput("");
        ChatData();
    }

    console.log(
        chatData.filter( f => f.toUser === myUserID[0] , f => f.fromUser === talkToUserID[0])
    )

    
    
    return (
        <div>
            <div className="chatbox">
                <div className="send">
                    {/* 受信 */}
                    {
                        chatData.filter( f => f.toUser === myUserID[0] , f => f.fromUser === talkToUserID[0])
                                .map( (u , idx) => (
                                    <div key={idx}>
                                        <UserIcon src={u.image} alt={u.username}  />
                                        {u.contents}
                                    </div>
                                ))
                    }
                    {/* 送信 */}
                    {
                        chatData.filter( f => f.fromUser === myUserID[0] , t => t.toUser === myUserID[0] )
                                .map( (u , idx) => (
                                    <div key={idx}>
                                        <UserIcon src={u.image} alt={u.username}  />
                                        {u.contents}
                                    </div>
                                ))
                    }


                </div>


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