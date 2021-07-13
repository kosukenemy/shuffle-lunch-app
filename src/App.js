import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router , Switch, Route, Link } from 'react-router-dom';
import { GlobalStyle, LoginArea,  LoginField, BasicButton, GradationType1, LogOutButton , HeaderLogo, MenuBar, HomeContainer, SideMenu, MainInner, MainInNavbar, MainArea, User, UserIcon , UserName } from '../src/Style/Style';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

// firebase userlist
import { FetchUserlistData } from '../src/API/API';
import Home from './Page/Home';
import Userlist from './Page/Userlist';
import UserPage from './Page/UserPage';
import MyPage from './Page/MyPage';
import ChatList from './Page/ChatList';
import Chat from './Page/Chat';

export const FetchUser = React.createContext();

function App() {


    // ログイン方法 email / password
    const [inputEmail, setInputEmail] = useState(
        window.sessionStorage.getItem("mail") == null
        ? ""
        : window.sessionStorage.getItem("mail")
    );

    const [inputpassword ,setInputpassword] = useState("");


    // firebase userlist 関数
    const [getUserlist , setGetUserlist] = useState([{}]);


    // ユーザーのログイン状態のステート,ステートはセッションストレージに保存
    const [loginState , SetLoginState ] = useState(
        window.sessionStorage.getItem("loginState") ? false : true
    );
    // fire base
    const getUniqueStr = getUserlist.filter(this_user => this_user.email === inputEmail).map(m => m);


    useEffect(() => {
        const FetchAPI = async() => {
            setGetUserlist( await FetchUserlistData() );
        }
        FetchAPI();

/*         const interval = setInterval(()=>{
            FetchAPI();
        },10000)

        return()=>clearInterval(interval) */
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
        
    }
    

    const handleSubmitToLogin = (e) => {
        e.preventDefault();

        // fireBase
        if(getUserlist.map(m => (m.email)).includes(inputEmail)) {
            if(getUserlist.map(m => (m.password)).includes(inputpassword)) {

                console.log(inputEmail, inputpassword )
                SetLoginState(!loginState)
                saveToLocalStorage();
            }

                
        } else {
            alert('ユーザーは登録されていません。')
            SetLoginState(loginState)
        } 
    }


  return (
    <>
    <Router>
    <Switch>
        <FetchUser.Provider value={getUniqueStr}>
            <div style={{position:'relative'}}>
            <GlobalStyle />
            {/* ログイン画面 ----------------------------------------*/}
                {loginState &&
                    <LoginArea className="login_form" onSubmit={ (e) => handleSubmitToLogin(e) }>
                        <h1 className="login-title">ログイン</h1>                      
                        <LoginField type="email" placeholder="メールアドレス" value={inputEmail} onChange={ (e) => setInputEmail(e.target.value) } />
                        <LoginField type="password" placeholder="パスワード" value={inputpassword} onChange={ (e) => setInputpassword(e.target.value) } />
                        <BasicButton style={GradationType1} type="submit">ログイン</BasicButton>
                    </LoginArea>
                }


            {/* ログイン後 ----------------------------------------*/}
                {!loginState &&
                    <HomeContainer>

                        {/* SideMenu*/}
                        <SideMenu>
                                <HeaderLogo>logo</HeaderLogo>
                                <MenuBar>
                                    <Link to="/"><li><DashboardIcon style={{marginRight:'5px'}} />ダッシュボード</li></Link>
                                    <Link to="/myPage"><li><AccountCircleIcon style={{marginRight:'5px'}} />マイページ</li></Link>
                                    <Link to="/userlist"><li><PeopleAltIcon style={{marginRight:'5px'}} />ユーザー一覧</li></Link>
                                    <Link to="/chatlist"><li><ChatBubbleIcon style={{marginRight:'5px'}} />チャット</li></Link>
                                </MenuBar>
                        </SideMenu>
                        {/* SideMenu*/}

                        {/* main*/}
                        <MainInner>
                            <MainInNavbar>  
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
                                    ) )}
                                    <LogOutButton style={GradationType1} onClick={handleLogOut}>ログアウト</LogOutButton>
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
    </Switch>
    </Router>
    </>
  );
}

export default App;
