import React, { useContext ,useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FetchUser } from '../App';
import { FetchUserlistData } from '../API/API';
import { PageTitle, TitleIconProps, MyPageUserIcon, ChatUserList, ChatUserListContent } from '../Style/Style';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';


const ChatList = () => {
    const thisUser = useContext(FetchUser);
    const [userStatus , setUserStatus] = useState([]);
    const myID = userStatus.filter(w => w.id ).map(u => u.id );
    const [joinStatusUsers , setJoinStatusUsers] = useState([]);
    const JoinStatus = userStatus.filter(w => w.lunchState ).map(u => u.lunchState );
    const withLunchTime = userStatus.filter(w => w.lunchTime ).map(u => u.lunchTime );
    const withTalkTheme = userStatus.filter(w => w.talkTheme ).map(u => u.talkTheme );

    useEffect(() => {
        setUserStatus(thisUser);
        const FetchAPI = async() => {
            setJoinStatusUsers(await FetchUserlistData());
        }
        FetchAPI();
    },[thisUser])

    const matchAllUsers = joinStatusUsers.filter(j => j.id !== myID[0] )
    .filter(j => j.lunchState === JoinStatus[0] )
    .filter(m => m.lunchTime === withLunchTime[0])
    .filter(t => t.talkTheme === withTalkTheme[0])

    console.log(matchAllUsers)

    return (
        <div>
            <PageTitle>
                <><ChatBubbleIcon style={TitleIconProps} /><span>チャット</span></>
            </PageTitle>
            <span>条件がマッチしたユーザーが表示されます。</span>

            <div style={{ margin:'30px auto 0' }}>
                {matchAllUsers.map((user ) => (

                    <ChatUserList key={user.id}>
                        <Link style={{display:'flex', alignItems:'center'}} to={`/chat/${user.id}`}>
                            <MyPageUserIcon src={user.profile_image}  alt={user.username}/>
                            <ChatUserListContent>
                                <p className="name">{user.username}</p>
                                <p className="content">こんにちは</p>
                            </ChatUserListContent>
                        </Link>
                    </ChatUserList>

                ))}
            </div>
        </div>
    )
}

export default ChatList
