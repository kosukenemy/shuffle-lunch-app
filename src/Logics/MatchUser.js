import React, { useContext ,useState, useEffect } from 'react';
import { FetchUser } from '../App';
import { FetchUserlistData } from '../API/API';

export const MatchUser = () => {
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

    return matchAllUsers;
}

export default MatchUser
