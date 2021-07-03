import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserlist } from '../API/API'

const Userlist = () => {

    const [userlist , setUserlist] = useState([]);

    useEffect(() => {
        const FetchAPI = async() => {
        setUserlist(await fetchUserlist());
        }
        FetchAPI();
    },[])
    console.log(userlist)

    return (
        <div>
{/*             {userlist.map((user) => (
                <div key={user.id}>
                    <Link to={`userPage/${user.id}`}>
                    <div>
                        <img src={user.poster} alt={user.username} />
                        <p>{user.username}</p>
                    </div>
                    </Link>
                </div>
            ))} */}
        </div>
    )
}
export default Userlist;