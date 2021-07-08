import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router , Switch, Route, Link } from 'react-router-dom';
import { fetchUserlist } from '../src/API/API';
import { GlobalStyle, LoginArea,  LoginField, BasicButton, GradationType1, LogOutButton , HeaderLogo, MenuBar, HomeContainer, SideMenu, MainInner, MainInNavbar, MainArea, User, UserIcon , UserName } from '../src/Style/Style';

// firebase userlist
import { FetchUserlistData } from '../src/API/API';
import Home from './Page/Home';
import Userlist from './Page/Userlist';
import UserPage from './Page/UserPage';
import MyPage from './Page/MyPage';

export const FetchUser = React.createContext();

function App() {


    // ログイン方法 email / password
    const [inputEmail, setInputEmail] = useState(
        window.sessionStorage.getItem("mail") == null
        ? ""
        : window.sessionStorage.getItem("mail")
    );

    const [inputpassword ,setInputpassword] = useState("");

    // fetchUserlistを呼んで返す
    const [matchUserData ,setMatchUserData ] = useState([]);

    // firebase userlist 関数
    const [getUserlist , setGetUserlist] = useState([{}]);



    // ユーザーのログイン状態のステート,ステートはセッションストレージに保存
    const [loginState , SetLoginState ] = useState(
        window.sessionStorage.getItem("loginState") ? false : true
    );

    const getUniqueStr = matchUserData.filter(this_user => this_user.email === inputEmail).map(m => m);

    // ランチ参加可能なユーザー
    /* const lunchJoinUser = matchUserData.filter( join => join.lunchState === "参加" ) */


    useEffect(() => {
        const FetchAPI = async() => {
            setMatchUserData( await fetchUserlist() );
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

        // submitされたe-mailとpasswordでjsonからユーザ情報を検索して、Trueならログイン
/*         if(matchUserData.map(m => (m.email)).includes(inputEmail)) {
            if(matchUserData.map(m => (m.password)).includes(inputpassword)) {
                SetLoginState(!loginState)
                saveToLocalStorage();
            }

                
        } else {
            alert('ユーザーは登録されていません。')
            SetLoginState(loginState)
        }  */

        // fireBase ver.
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
                                    <Link to="/"><li>ダッシュボード</li></Link>
                                    <Link to="/myPage"><li>マイページ</li></Link>
                                    <Link to="/userlist"><li>ユーザー一覧</li></Link>
                                    <li>フィード</li>
                                    <li>設定</li>
                                </MenuBar>
                        </SideMenu>
                        {/* SideMenu*/}

                        {/* main*/}
                        <MainInner>
                            <MainInNavbar>  
{/*                                     {matchUserData.filter(this_user => this_user.email === inputEmail).map(u => (
                                        <div key={u.id}>
                                            <User>
                                                <UserIcon src={u.poster} alt={u.username}  />
                                                <UserName>
                                                    <span className="team">{u.team}</span>
                                                    <Link to="/myPage">
                                                        <span className="name">{u.username}</span>
                                                    </Link>
                                                </UserName>
                                            </User>
                                        </div>
                                    ) )} */}

                                        {getUserlist.filter(this_user => this_user.email === inputEmail).map((u ,idx) => (
                                        <div key={idx}>
                                            <User>
                                                {/* <UserIcon src={u.poster} alt={u.username}  /> */}
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
