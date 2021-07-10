import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FetchUserlistData } from '../API/API';
import { MyPageUserIcon, UserInner, UserName } from '../Style/Style'

const Userlist = () => {

    const [userlist , setUserlist] = useState([]);

    useEffect(() => {
        const FetchAPI = async() => {
        setUserlist(await FetchUserlistData());
        }
        FetchAPI();
    },[])
    console.log(userlist)

    return (
        <div>
            {userlist.map((user ,idx) => (
                <div key={idx}>
                    <UserInner>
                        <MyPageUserIcon src={user.profile_image} alt={user.username} />
                        <UserName style={{padding:'0'}}>
                            <span className="il_team">{user.team}</span>
                            <span className="il_name">{user.username}</span>
                        </UserName>
                    </UserInner>


{/*                     <Link to={`userPage/${user.id}`}>
                    <div>
                        <img src={user.profile_image} alt={user.username} />
                        <p>{user.username}</p>
                    </div>
                    </Link> */}
                </div>
            ))}
        </div>
    )
}
export default Userlist;