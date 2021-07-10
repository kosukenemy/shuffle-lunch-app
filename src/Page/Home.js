import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FetchUser } from '../App';
import { FetchUserlistData } from '../API/API';
import { PageTitle, PageInnerWrapper, TitleIconProps } from '../Style/Style';
import DashboardIcon from '@material-ui/icons/Dashboard';



const Home = () => {
    const thisUser = useContext(FetchUser);
    const [userStatus , setUserStatus] = useState([]);
    const [joinStatusUsers , setJoinStatusUsers] = useState([]);
    const [userNotFind , setUserNotFind] = useState(false);
    const myID = userStatus.filter(w => w.id ).map(u => u.id );
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

    if( matchAllUsers === []) {
        setUserNotFind(!userNotFind);
    }

    return (
        <div>
                <PageTitle> 
                    <><DashboardIcon style={TitleIconProps} /><span>ダッシュボード</span></>
                </PageTitle>
                
                <PageInnerWrapper>
                    <span>あなたのステータス</span>
                    <Link to="/myPage"><li>ステータスを変更する</li></Link>
                    <div>
                        {userStatus.slice(0,1).map((u , idx) => (
                            <div key={idx}>
                                <p>{u.lunchState}</p>
                                <p>{u.lunchTime}</p>
                                <p>{u.talkTheme}</p>
                            </div>
                        ))}
                    </div>
                </PageInnerWrapper>
                <PageInnerWrapper style={{margin:'30px auto 0'}}>
                    <h2>あなたとマッチしたユーザー</h2>
                    {!userNotFind ?

                        <div>
                            {matchAllUsers.map((user , idx) => (
                                <div key={idx}>
                                    {user.username}
                                    <div>
                                        <button>お誘いメールを送信する</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    :
                        <div>
                            <span>ごめんなさい！マッチしたユーザーはいませんでした...</span>
                        </div>
                    }
                </PageInnerWrapper>
        </div>
    )
}
export default Home;