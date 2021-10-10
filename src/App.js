import { useState, useEffect }  from 'react';
import { BrowserRouter as Router , Switch, Route, Link, } from 'react-router-dom';
import { GlobalStyle, LoginArea,  LoginField, BasicButton, ThemeColor, MenuBar, HomeContainer, SideMenu, ToggleButton, MainInner, MainInNavbar, MainArea, HeaderLogo, User, UserIcon , UserName } from './Style/Style';

import RestaurantIcon from '@material-ui/icons/Restaurant';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// firebase userlist
import { FetchUserlistData } from './API/API';
import ScrollToTop from './Components/ScrollToTop';
import Home from './Page/Home';
import Userlist from './Page/Userlist';
import UserPage from './Page/UserPage';
import MyPage from './Page/MyPage';
import ChatList from './Page/ChatList';
import Chat from './Page/Chat';

// firebase auth
import firebase from 'firebase/app';



const App = () => {    
    const [loginEmail , setLoginEmail] = useState("");
    const [loginPassword , setLoginPassword] = useState("");
    const [allUser , setAllUser] = useState([]);
    const [userLogin , setUserLogin] = useState(window.sessionStorage.getItem("user_login") ? true : false);
    const [user_id , setUser_id] = useState(window.sessionStorage.getItem("u_id") == null ? "" : window.sessionStorage.getItem("u_id"));
    const [getUserlist , setGetUserlist] = useState([{}]);
    const [toggleOpenMenu , setToggleOpenMenu] = useState(false);
    
    const emailInputForm = (e) => setLoginEmail(e.target.value);
    const passwordInputForm = (e) => setLoginPassword(e.target.value);
    const getUserData = (users) => {
        return users.filter(user => user.email.indexOf(loginEmail)!== -1) 
            && users.filter(user => user.password.indexOf(loginPassword)!== -1)
    }
    const storeCookieUserId = (user) => { return user.map(u => u.id) };


    const login = async(e) => {
        e.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword);
            setUserLogin(!userLogin);
            window.sessionStorage.setItem("user_login", !userLogin);
            window.sessionStorage.setItem("u_id" , storeCookieUserId(getUserData(getUserlist)));
            
        } catch (err) {
            alert(err);
        }
        window.location.reload();
    }

    const logOut = () => {
        setUserLogin(!userLogin);
        window.sessionStorage.setItem("user_login", "");
        setUser_id(window.sessionStorage.setItem("u_id" , ""));

    }

    useEffect(() => {
        const FetchGetUsers = async() => {
            setAllUser( await FetchUserlistData() );
        }
        FetchGetUsers();
    },[]);





    
    const FetchGetUsers = async() => {
        setGetUserlist( await FetchUserlistData() );
    }

    useEffect(() => FetchGetUsers() ,[]);

    
    const handleMenuOpen = () => {
        setToggleOpenMenu(!toggleOpenMenu)
    }

    const user = allUser.filter(u => u.id.indexOf(user_id)!== -1);


    return (
    <>
        <Router>
        <Switch>
            <ScrollToTop>
            <div style={{position:'relative'}}>
                <GlobalStyle />
                    <>
                    {userLogin === false && 
                        <LoginArea onSubmit={login}>
                            <h1 className="login-title">ログイン</h1>
                            <LoginField onChange={emailInputForm} defaultValue={loginEmail} type="email" placeholder="メールアドレス" autoComplete="off" />
                            <LoginField onChange={passwordInputForm} defaultValue={loginPassword} type="password" placeholder="パスワード" autoComplete="off" />
                            <BasicButton style={ThemeColor}>ログイン</BasicButton>
                        </LoginArea>
                    }
                    </>


                {/* ログイン後 ----------------------------------------*/}
                    {userLogin === true &&
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
                                            {user.map((u ,idx) => (
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
                                            <button onClick={logOut}>ログアウト</button>
                                        </div>
                                </MainInNavbar>

                                {/* component*/}
                                <MainArea>
                                <Route exact path="/" component={Home} />
                                <Route path="/userlist" component={Userlist} />
                                <Route path="/userPage/:id" component={UserPage} />
                                <Route path="/myPage" render={() => <MyPage user={user} />} />
                                <Route path="/chatlist" render={() => <ChatList user={user} />} />
                                <Route path="/chat/:id" render={() => <Chat user={user} />}  />

                                
                                </MainArea>

                            </MainInner>
                            {/* main*/}
                        </HomeContainer>
                    }
                </div>
            </ScrollToTop>
        </Switch>
        </Router>
    </>
    );
}

export default App;
