import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router , Switch, Route, Link, } from 'react-router-dom';
import { GlobalStyle, LoginArea,  LoginField, BasicButton, ThemeColor, MenuBar, HomeContainer, SideMenu, ToggleButton, MainInner, MainInNavbar, MainArea, HeaderLogo, User, UserIcon , UserName } from '../src/Style/Style';

import RestaurantIcon from '@material-ui/icons/Restaurant';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// firebase userlist
import { FetchUserlistData } from '../src/API/API';
import ScrollToTop from './Components/ScrollToTop';
import Home from './Page/Home';
import Userlist from './Page/Userlist';
import UserPage from './Page/UserPage';
import MyPage from './Page/MyPage';
import ChatList from './Page/ChatList';
import Chat from './Page/Chat';

// テストユーザー用 ポップアップ
import TestUserPopUp from './Components/TestUserPopUp';

export const FetchUser = React.createContext();

function App({history}) {

    // ログイン方法 email / password
    const [inputEmail, setInputEmail] = useState(
        window.sessionStorage.getItem("mail") == null
        ? ""
        : window.sessionStorage.getItem("mail")
    );
    const [inputpassword ,setInputpassword] = useState("");
    const [getUserlist , setGetUserlist] = useState([{}]);
    const [loginState , SetLoginState ] = useState(
        window.sessionStorage.getItem("loginState") ? false : true
    );
    const getUniqueStr = getUserlist.filter(this_user => this_user.email === inputEmail).map(m => m);
    const [toggleOpenMenu , setToggleOpenMenu] = useState(false);
    

    useEffect(() => {
        const FetchAPI = async() => {
            setGetUserlist( await FetchUserlistData() );
        }
        FetchAPI();
    },[])


    const saveToLocalStorage = () => {
        window.location.reload();
        window.sessionStorage.setItem("loginState", loginState);
        window.sessionStorage.setItem("mail", inputEmail);

    };

    const handleLogOut = () => {
        let clear = "";
        setInputEmail(clear);
        setInputpassword(clear);
        window.sessionStorage.setItem("loginState", clear);
        window.sessionStorage.setItem("mail", clear);
        window.location.reload();
        window.location.push('/')
        
    }
    
    const handleSubmitToLogin = (e) => {
        e.preventDefault();

        // fireBase
        if(getUserlist.map(m => (m.email)).includes(inputEmail)) {
            if(getUserlist.map(m => (m.password)).includes(inputpassword)) {

                SetLoginState(!loginState)
                saveToLocalStorage();
            }

                
        } else {
            alert('ユーザーは登録されていません。')
            SetLoginState(loginState)
        } 
    }
    
    const handleMenuOpen = () => {
        setToggleOpenMenu(!toggleOpenMenu)
    }



    return (
    <>
    <Router>
    <Switch>
        <ScrollToTop>
        <FetchUser.Provider value={getUniqueStr}>
            <div style={{position:'relative'}}>
            <GlobalStyle />
            {/* ログイン画面 ----------------------------------------*/}
                {loginState &&
                    <>
                    <LoginArea className="login_form" onSubmit={ (e) => handleSubmitToLogin(e) }>
                        <h1 className="login-title">ログイン</h1>                    
                        <LoginField type="email" placeholder="メールアドレス" value={inputEmail} onChange={ (e) => setInputEmail(e.target.value) } />
                        <LoginField type="password" placeholder="パスワード" value={inputpassword} onChange={ (e) => setInputpassword(e.target.value) } />
                        <BasicButton style={ThemeColor} type="submit">ログイン</BasicButton>

                        {/* テストユーザー用 ポップアップ --------------*/}
                        <TestUserPopUp />
                        {/* テストユーザー用 ポップアップ --------------*/}

                    </LoginArea>
                    </>
                }


            {/* ログイン後 ----------------------------------------*/}
                {!loginState &&
                    <HomeContainer>

                        {/* SideMenu*/}
                        <SideMenu className={`${toggleOpenMenu && "onToggle"} `} style={ThemeColor}>
                                <div style={{position:'sticky', top:'0', left:'0'}}>
                                <div style={{padding:'23px 0px'}}>
                                    <ToggleButton className={`${toggleOpenMenu && "onToggle__button"} `} onClick={handleMenuOpen}>
                                        {toggleOpenMenu 
                                            ? 
                                            <>
                                            <ArrowBackIcon style={{ fontSize:'1.8rem'}} />
                                            </>
                                            : 
                                            <>
                                            <HeaderLogo>
                                                <h1 className="logo">しゃふラン🍴</h1>
                                                <MenuIcon style={{ fontSize:'1.8rem'}} />
                                            </HeaderLogo>
                                            </>
                                        }
                                    </ToggleButton>
                                </div>
                                <MenuBar>
                                    <Link to="/">
                                        <li>
                                            <RestaurantIcon style={{marginRight:'5px'}} />
                                            <span className={`itemMenu ${toggleOpenMenu && "onToggle__menu"} `}>お店を探す</span>
                                        </li>
                                    </Link>
                                    <Link to="/myPage">
                                        <li>
                                            <AccountCircleIcon style={{marginRight:'5px'}} />
                                            <span className={`itemMenu ${toggleOpenMenu && "onToggle__menu"} `}>マイページ</span>
                                        </li>
                                    </Link>
                                    <Link to="/userlist">
                                        <li>
                                            <PeopleAltIcon style={{marginRight:'5px'}} />
                                            <span className={`itemMenu ${toggleOpenMenu && "onToggle__menu"} `}>ユーザー一覧</span>
                                        </li>
                                    </Link>
                                    <Link to="/chatlist">
                                        <li>
                                            <ChatBubbleIcon style={{marginRight:'5px'}} />
                                            <span className={`itemMenu ${toggleOpenMenu && "onToggle__menu"} `}>チャット</span>
                                        </li>
                                    </Link>
                                </MenuBar>
                                </div>
                        </SideMenu>
                        {/* SideMenu*/}

                        {/* main*/}
                        <MainInner>
                            <MainInNavbar>  
                                    <div className="inner" style={{display:'flex' , float:'right' , alignItems:'center' , }}>
                                        {getUserlist.filter(this_user => this_user.email === inputEmail).map((u ,idx) => (
                                            <div className="nav_inner" key={idx}>
                                                <User>
                                                    <UserIcon src={u.profile_image} alt={u.username}  />
                                                    <UserName>
                                                        <span className="team">{u.team}</span>
                                                        <Link to="/myPage">
                                                            <span className="name">{u.username}</span>
                                                        </Link>
                                                    </UserName>
                                                </User>
                                            </div>
                                        ))}
                                        <button style={{background:'transparent' , marginLeft:'50px'}}　onClick={handleLogOut}>
                                            <Link to="/">
                                                <ExitToAppIcon />
                                                <p style={{fontWeight:'600', fontSize:'9px'}}>ログアウト</p>
                                            </Link>
                                        </button>
                                    </div>
                            </MainInNavbar>

                            {/* component*/}
                            <MainArea>
                            <Route exact path="/" component={Home} />
                            <Route path="/userlist" component={Userlist} />
                            <Route path="/userPage/:id" component={UserPage} />
                            <Route path="/myPage" component={MyPage} />
                            <Route path="/chatlist" component={ChatList} />
                            <Route path="/chat/:id" component={Chat} />

                            
                            </MainArea>

                        </MainInner>
                        {/* main*/}
                    </HomeContainer>
                }
            </div>
        </FetchUser.Provider>
        </ScrollToTop>
    </Switch>
    </Router>
    </>
  );
}

export default App;
