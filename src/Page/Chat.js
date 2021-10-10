import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { FetchUserlistData } from '../API/API';
import { useParams } from 'react-router';
import { db } from '../API/Firebase';
import { PageTitle , UserIcon , TitleIconProps, ChatMessageContainer, ChatMessage, MessageInner, ChatInputInner, ChatInputField, ChatSubmitButton, PrimaryGray } from '../Style/Style';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

const Chat = ({user}) => {
    // console.log(user , "user props")
    let { id } = useParams();
    const thisUser = user;
    const [loginUser , setLoginUser] = useState([]);
    const [chatInput ,setChatInput] = useState("");
    // mounted Chat
    const [mountedChatData , setMountedChatData] = useState([]);




    useEffect(() => {
        db.collection('chatlist').onSnapshot(snapshot => {
            setMountedChatData(snapshot.docs.map( doc => doc.data() ))
        })
    },[])

    // 自分のデータ
    const matchUser = loginUser.filter( u => u.id === id );
    // 自分のデータの画像
    const myPic = thisUser.filter( u => u.profile_image ).map( u => u.profile_image );
    // トークするユーザーid
    const talkToUserID = matchUser.filter( t => t.id ).map( t => t.id);
    // トークするユーザー名
    const talkToUserName = matchUser.filter( t => t.username ).map( t => t.username);
    // 自分のID
    const myUserID = thisUser.filter( t => t.id  ).map( t => t.id);

    

    useEffect( () => {
        const FetchAPI = async() => {
            setLoginUser(await FetchUserlistData(id) );
        }
        FetchAPI();
    },[id])



    const ChatData = async() => {
        try {
            const chatRef = db.collection('chatlist')
            await chatRef.add({
                contents : chatInput,
                toUser : talkToUserID[0],
                fromUser : myUserID[0],
                image : myPic[0],
                createdAt: new Date()
            })
            
        } catch (err) {
            console.log(`Error: ${JSON.stringify(err)}`)
        }
        
    }


    const handleSubmit = (e) => {

        if ( !chatInput.trim() ) {
            return null
        } else {
            e.preventDefault();
            // インプット初期化
            setChatInput("");
            ChatData();
        }

    }

    // chatData
    const sender = mountedChatData.filter( f => f.fromUser === myUserID[0]).filter( t => t.toUser === talkToUserID[0] );
    const receiver = mountedChatData.filter( f => f.fromUser === talkToUserID[0]).filter( t => t.toUser === myUserID[0] );


    //スプレッド構文で結合
    const chatMessage =　[...sender , ...receiver];
    // 時間でソートさせる (投稿された順)
    const chatMessage_timeSort = chatMessage.sort((a , b) => ( (a.createdAt < b.createdAt) ? -1 : 1));


/*     const nowTime = dayjs();
    const nowTime_json = nowTime.format('YYYY/MM/DD/HH:mm')
    console.log( 
        "今",nowTime_json,
    ) */


    return (
        <div style={{position:'relative'}}>
            <PageTitle>
                <><ChatBubbleIcon style={TitleIconProps} />
                    <span style={{fontSize:'12px', marginRight:'10px'}}>Talk with</span>
                    <span style={{fontSize:'18px'}}>{talkToUserName[0]}</span>
                </>
            </PageTitle>
            <div>
                <ChatMessageContainer>
                    {
                        chatMessage_timeSort.map( (u , idx) =>  {
                            const messageDate = dayjs(u.createdAt.toDate());
                            return (
                                <ChatMessage key={idx}>
                                    <UserIcon src={u.image} alt={u.username}  />
                                    <MessageInner>
                                        <div className="balloon1-left">
                                            <p style={{whiteSpace:'pre-wrap'}}>
                                                {u.contents}
                                            </p>
                                        </div>
                                        <time className="date">
                                            {new Date(u.createdAt.seconds * 1000).toLocaleDateString("ja")}
                                            <span style={{marginLeft:'5px'}}>
                                                {messageDate.format('HH:mm')}
                                            </span>
                                        </time>
                                    </MessageInner>
                                </ChatMessage>
                            )
                        })
                    }
                </ChatMessageContainer>
            </div>

            <ChatInputInner>
                <ChatInputField
                onChange={ (e) => setChatInput(e.target.value) } 
                type="text" 
                value={chatInput}
                ></ChatInputField>
                <ChatSubmitButton style={PrimaryGray} type="submit" onClick={handleSubmit}>送信</ChatSubmitButton>
            </ChatInputInner>
        </div>
    )
}

export default Chat