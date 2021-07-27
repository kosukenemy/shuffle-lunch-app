import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FetchUser } from '../App';
import { FetchUserlistData } from '../API/API';
import HotPapper from '../Components/HotPapper'
import { PageTitle, PageInnerWrapper, TitleIconProps , MiniButton } from '../Style/Style';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocationOnIcon from '@material-ui/icons/LocationOn';



const Home = () => {
    const thisUser = useContext(FetchUser);
    const [userStatus , setUserStatus] = useState([]);
    const [joinStatusUsers , setJoinStatusUsers] = useState([]);



    useEffect(() => {
        setUserStatus(thisUser);
        const FetchAPI = async() => {
            setJoinStatusUsers(await FetchUserlistData());
        }
        FetchAPI();
    },[thisUser])



    return (
        <div>
                <PageTitle> 
                    <><RestaurantIcon style={TitleIconProps} /><span>お店を探す</span></>
                </PageTitle>
                
                <PageInnerWrapper>
                    
                    <PageTitle style={{fontSize:'20px'}}>  
                        <><LocationOnIcon style={TitleIconProps} /><span>六本木周辺</span></>
                    </PageTitle>
                    {/* ホットペッパー */}
                    <HotPapper />
                </PageInnerWrapper>
        </div>
    )
}
export default Home;