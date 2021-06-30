import React , { useState, useEffect } from 'react';
import { fetchUserlist } from '../API/API';
import { GlobalStyle, LoginArea,  LoginField, BasicButton, GradationType1, LogOutButton , UserIcon } from '../Style/Style'
import Userlist from '../Page/Userlist'




const Home = () => {

    // ログイン方法 email / password
    const [inputEmail, setInputEmail] = useState(
        window.sessionStorage.getItem("mail") == null
        ? ""
        : window.sessionStorage.getItem("mail")
    );
    const [inputpassword ,setInputpassword] = useState("");

    // fetchUserlistを呼んで返す
    const [matchUserData ,setMatchUserData ] = useState([]);

    // ユーザーのログイン状態のステート,ステートはlocalストレージに保存
    const [loginState , SetLoginState ] = useState(
        window.sessionStorage.getItem("loginState") ? false : true
    );



    useEffect(() => {
        const FetchAPI = async() => {
            setMatchUserData( await fetchUserlist() );
        }
        FetchAPI();
    },[])

    // ユーザーのメールアドレスをセッション管理に使うが、ユニークIDに変換する関数を実行
    function getUniqueStr(myStrong){
        var strong = 1000;
        if (myStrong) strong = myStrong;
        return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
    }
    const uniqueID =　getUniqueStr(inputEmail);

    const saveToLocalStorage = () => {
        window.sessionStorage.setItem("loginState", loginState);
        window.sessionStorage.setItem("unique", uniqueID);
    };

    const handleLogOut = () => {
        let clear = "";
        setInputEmail(clear);
        setInputpassword(clear);
        window.sessionStorage.setItem("loginState", clear);
        window.sessionStorage.setItem("unique", clear);
        window.location.reload();
        
    }
    

    const handleSubmitToLogin = (e) => {
        e.preventDefault();

        // submitされたe-mailとpasswordでjsonからユーザ情報を検索して、Trueならログイン
        if(matchUserData.map(m => (m.email)).includes(inputEmail)) {
            if(matchUserData.map(m => (m.password)).includes(inputpassword)) {
                SetLoginState(!loginState)
                saveToLocalStorage();
            }

                
        } else {
            alert('ユーザー名は登録されていません。')
            SetLoginState(loginState)
        }       
    }


    return (
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
                <div className="App-container">

                    {/* SideMenu*/}
{/*                     <nav className="sideMenu">
                            <div className="header">logo</div>
                            <ul className="menu">
                                <li>ダッシュボード</li>
                                <li>ユーザー一覧</li>
                                <li>フィード</li>
                                <li>設定</li>
                            </ul>
                    </nav> */}
                    {/* SideMenu*/}

                    {/* main*/}
                    <main className="main">
                        <div className="user">
                            <LogOutButton style={GradationType1} onClick={handleLogOut}>ログアウト</LogOutButton>
                            <div>
                                {matchUserData.filter(this_user => this_user.email === inputEmail).map(u => (
                                    <div key={u.id}>
                                        <div className="icon">
                                            <UserIcon src={u.poster} alt={u.username}  />
                                            <span>{u.username}</span>
                                        </div>
                                    </div>
                                ) )}
                            </div>
                        </div>

                    </main>
                    {/* main*/}
                </div>
            }
        </div>
    )
}
export default Home;