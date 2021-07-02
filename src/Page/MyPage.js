import React, { useContext, useState, useEffect } from 'react';
import { FetchUser } from '../App';

const MyPage = () => {

    const thisUser = useContext(FetchUser);
    const [fetchUserData , setFetchUserData] = useState([{}]);

    useEffect(() => {
        setFetchUserData(thisUser.concat(fetchUserData));
    },[thisUser])

    console.log(fetchUserData)

    return (
        <div>
            MyPage
            {fetchUserData.map(((n , idx) => (
                <div key={idx}>
                    {n.username}
                </div>
            )))}
        </div>
    )
}

export default MyPage
