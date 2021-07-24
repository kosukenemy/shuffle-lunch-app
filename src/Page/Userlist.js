import React, { useState, useEffect } from 'react';
import { FetchUserlistData } from '../API/API';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { PageTitle, TitleIconProps, UserListWrapper,MyPageUserIcon, UserInner, UserName } from '../Style/Style'

const Userlist = () => {

    const [userlist , setUserlist] = useState([]);

    useEffect(() => {
        const FetchAPI = async() => {
        setUserlist(await FetchUserlistData());
        }
        FetchAPI();
    },[])

    return (
        <div>
            <PageTitle>
                <><PeopleAltIcon style={TitleIconProps} /><span>ユーザー一覧</span></>    
            </PageTitle>

            <UserListWrapper>
            {userlist.map((user ,idx) => (
                <div key={idx}>
                    <UserInner>
                        <MyPageUserIcon src={user.profile_image} alt={user.username} />
                        <UserName style={{padding:'0'}}>
                            <span className="il_team">{user.team}</span>
                            <span className="il_name">{user.username}</span>
                            <span className="il_intro">{user.introduction}</span>
                        </UserName>
                    </UserInner>
                </div>
            ))}
            </UserListWrapper>
        </div>

    )
}
export default Userlist;