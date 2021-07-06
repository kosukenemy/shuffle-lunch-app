import React, { useContext, useState, useEffect } from 'react';
import Userlist from '../Page/Userlist';
import { FetchUser } from '../App';
import { fetchUserlist } from '../API/API'
import { PageTitle, PageInnerWrapper } from '../Style/Style'



const Home = () => {
    const thisUser = useContext(FetchUser);
    const [userStatus , setUserStatus] = useState([]);
    const [joinStatusUsers , setJoinStatusUsers] = useState([]);
    const [userNotFind , setUserNotFind] = useState(false);
    const myID = userStatus.filter(w => w.id ).map(u => u.id );
    const wantEatGenrelunch = userStatus.filter(w => w.lunchGenre ).map(u => u.lunchGenre );
    const JoinStatus = userStatus.filter(w => w.lunchState ).map(u => u.lunchState );

    useEffect(() => {
        setUserStatus(thisUser);
        const FetchAPI = async() => {
            setJoinStatusUsers(await fetchUserlist());
        }
        FetchAPI();
    },[thisUser])


    const matchAllUsers = joinStatusUsers.filter(j => j.id !== myID[0] )
                            .filter(j => j.lunchGenre === wantEatGenrelunch[0] )
                            .filter(m => m.lunchState === JoinStatus[0])

    console.log(matchAllUsers)

    if( matchAllUsers === []) {
        setUserNotFind(!userNotFind);
    }

    return (
        <div>
                <PageTitle> 
                    <span>ダッシュボード</span>
                </PageTitle>
                
                <PageInnerWrapper>
                    <span>あなたのステータス</span>
                    <div>
                        {userStatus.slice(0,1).map((u , idx) => (
                            <div key={idx}>
                                <p>{u.lunchState}</p>
                                <p>{u.lunchGenre}</p>
                            </div>
                        ))}
                    </div>
                </PageInnerWrapper>
                <PageInnerWrapper style={{margin:'20px auto 0'}}>
                    <h2>あなたとマッチしたユーザー</h2>
                    {!userNotFind ?

                        <div>
                            {matchAllUsers.map((user , idx) => (
                                <div key={idx}>
                                    {user.username}
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