import React, { useContext } from 'react';
import { FetchUser } from '../App';

const MyPage = () => {

    const [thisUser , setThisUser] = useContext(FetchUser)

    console.log(thisUser)

    return (
        <div>
            MyPage
        </div>
    )
}

export default MyPage
