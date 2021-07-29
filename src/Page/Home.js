import React from 'react';

import HotPapper from '../Components/HotPapper'
import { PageTitle, PageInnerWrapper, TitleIconProps  } from '../Style/Style';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocationOnIcon from '@material-ui/icons/LocationOn';



const Home = () => {


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