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
            詳細ページ
        </div>
    )
}
export default UserPage;