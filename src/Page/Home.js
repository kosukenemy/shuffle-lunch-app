import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FetchUser } from '../App';
import { FetchUserlistData } from '../API/API';
import HotPapper from '../Components/HotPapper'
import { PageTitle, PageInnerWrapper, TitleIconProps , MiniButton } from '../Style/Style';
import DashboardIcon from '@material-ui/icons/Dashboard';
import RestaurantIcon from '@material-ui/icons/Restaurant';



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
                    <><DashboardIcon style={TitleIconProps} /><span>ダッシュボード</span></>
                </PageTitle>

                <PageInnerWrapper style={{margin:'0px auto 30px'}}>
                    条件がマッチしたユーザーをランチに誘ってみよう！
{/*                     <Link to="/chatlist">
                        <MiniButton>チャット</MiniButton>
                    </Link> */}
                </PageInnerWrapper>
                
                <PageInnerWrapper>
                    
                    <PageTitle style={{fontSize:'20px'}}>  
                        <><RestaurantIcon style={TitleIconProps} /><span>六本木周辺のお店</span></>
                    </PageTitle>
                    {/* ホットペッパー */}
                    <HotPapper />
                </PageInnerWrapper>
        </div>
    )
}
export default Home;