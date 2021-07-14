import React, { useState, useEffect, useContext } from 'react';
import dayjs from 'dayjs';
import { FetchUserlistData , FetchChatlistData } from '../API/API';
import { FetchUser } from '../../src/App'
import { useParams } from 'react-router';
import { db } from '../API/Firebase';
import { PageTitle , UserIcon , TitleIconProps } from '../Style/Style';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

const Chat = () => {
    
    let { id } = useParams();
    const thisUser = useContext(FetchUser);
    const [user , setUser] = useState([]);
    const [chatInput ,setChatInput] = useState("");
    const [chatData , setChatData] = useState([]);


    // 自分のデータ
    const matchUser = user.filter( u => u.id === id );
    // 自分のデータの画像
    const myPic = thisUser.filter( u => u.profile_image ).map( u => u.profile_image );
    // トークするユーザーid
    const talkToUserID = matchUser.filter( t => t.id ).map( t => t.id);
    // トークするユーザー名
    const talkToUserName = matchUser.filter( t => t.username ).map( t => t.username);
    // 自分のID
    const myUserID = thisUser.filter( t => t.id  ).map( t => t.id);

    useEffect(() => {
        const FetchAPI = async() => {
            setUser(await FetchUserlistData(id) );
            setChatData(await FetchChatlistData() );
        }
        FetchAPI();
    },[id])

    /* const createDate = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }); */


    const sendData = {
        contents : chatInput,
        toUser : talkToUserID[0],
        fromUser : myUserID[0],
        image : myPic[0],
        createdAt: new Date()
    }
    
    const ChatData = async() => {
        try {
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


    const sender = chatData.filter( f => f.fromUser === myUserID[0]).filter( t => t.toUser === talkToUserID[0] );
    const receiver = chatData.filter( f => f.fromUser === talkToUserID[0]).filter( t => t.toUser === myUserID[0] );
    

    //スプレッド構文で結合
    const chatMessage =　[...sender , ...receiver];
    // 時間でソートさせる (投稿された順)
    const chatMessage_timeSort = chatMessage.sort((a , b) => ( (a.createdAt < b.createdAt) ? -1 : 1))
    console.log(chatMessage_timeSort)


    return (
        <div>
            <PageTitle>
                <><ChatBubbleIcon style={TitleIconProps} />
                    <span style={{fontSize:'12px', marginRight:'10px'}}>Talk with</span>
                    <span style={{fontSize:'18px'}}>{talkToUserName[0]}</span>
                </>
            </PageTitle>
            <div className="chatbox">
                <div className="send">

                    
                    {
                        chatMessage_timeSort.map( (u , idx) =>  {
                            const messageDate = dayjs(u.createdAt.toDate());
                            return (
                                <div key={idx}>
                                    <UserIcon src={u.image} alt={u.username}  />
                                    {u.contents}
                                    <p>
                                    <time>
                                        {new Date(u.createdAt.seconds * 1000).toLocaleDateString("ja")}
                                        <span>
                                            {messageDate.format('HH:mm')}
                                        </span>
                                    </time>
                                    </p>
                                </div>
                            )
                        })
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