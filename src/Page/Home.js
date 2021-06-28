import React , { useState, useEffect } from 'react';
import { fetchUserlist } from '../API/API';
import { GlobalStyle, LoginArea,  LoginField, BasicButton, GradationType1 } from '../Style/Style'
import Userlist from '../Page/Userlist'

/* ---------
マテリアルUI
-----------*/



const Home = () => {

    // ログイン方法 email / password
    const [inputEmail, setInputEmail] = useState("");
    const [inputpassword ,setInputpassword] = useState("");

    // fetchUserlistを呼んで返す
    const [matchUserData ,setMatchUserData ] = useState([]);

    // email / passwordにマッチしたユーザーデータ
    const [loginData] = useState([]);

    // ユーザーのログイン状態のステート,ステートはlocalストレージに保存
    const [loginState , SetLoginState ] = useState(
        window.localStorage.getItem("loginState") ? false : true
    );

    useEffect(() => {
        const FetchAPI = async() => {
            setMatchUserData( await fetchUserlist() );
        }
        FetchAPI();
    },[])


    const saveToLocalStorage = () => {
        window.localStorage.setItem("loginState", loginState);
    };

    const handleLogOut = () => {
        let clear = "";
        setInputEmail(clear);
        setInputpassword(clear);
        window.localStorage.clear();
        window.location.reload();
    }
    

    const handleSubmitToLogin = (e) => {
        e.preventDefault();
        // submitされたe-mailとpasswordでjsonからユーザ情報を検索
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

    if(!loginState) {
        // 入力されたemailからインデックス番号を取得
        const i =  matchUserData.findIndex(({email}) => email === inputEmail);
        loginData.push(matchUserData[i]);
    } else {;}
    


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
                    <a className="new-account" href="#">新規登録はこちら</a>
                </LoginArea>
            }
            

            {/* ログイン後 ----------------------------------------*/}
            {!loginState &&
                <div className="App-container">

                    {/* SideMenu*/}
                    <nav className="sideMenu">
                            <div className="header">logo</div>
                            <ul className="menu">
                                <li>ダッシュボード</li>
                                <li>ユーザー一覧</li>
                                <li>フィード</li>
                                <li>設定</li>
                            </ul>
                    </nav>
                    {/* SideMenu*/}

                    {/* main*/}
                    <main className="main">
                        <div className="user">
                            <button onClick={handleLogOut}>ログアウト</button>
                            <div>
                            {loginData.slice(1,2).map(user => (
                                <div key={user.id}>
                                    {user.username}
                                </div>
                            ))}
                            </div>
                        </div>
                        コンテンツ
                    </main>
                    {/* main*/}
                </div>
            }
        </div>
    )
}
export default Home;