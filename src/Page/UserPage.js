import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router'
import { fetchUserDetail } from '../API/API'

const UserPage = () => {
    let { id } = useParams();
    const [userDetail , setUserDetail] = useState([]);

    useEffect(() => {
        const FetchMatchAPI = async () => {
            setUserDetail( await fetchUserDetail(id) )
        }
        FetchMatchAPI();
    },[id])


    return (
        <div>
            {userDetail.username}
            <span>{userDetail.introduction}</span>
        </div>
    )
}
export default UserPage;