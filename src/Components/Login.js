import React , { useState, useEffect } from 'react'
import { fetchUserlist } from '../API/API';

const Login = () => {

    const [name ,setName] = useState(
        window.localStorage.getItem("login") == null
            ? ""
            : window.localStorage.getItem("login")
        );
    // ログイン方法 email / password
    const [inputEmail, setInputEmail] = useState("");
    const [inputpassword ,setInputpassword] = useState("");

    // fetchUserlistを呼んで返す
    const [matchUserData ,setMatchUserData ] = useState([]);

    // email / passwordにマッチしたユーザーデータ
    const [loginData] = useState();

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
        window.localStorage.setItem("login", name);
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
        // ユーザー検索
/*         if(matchUserData.map(m => (m.username)).includes(name)) {
            SetLoginState(!loginState)
            const val = JSON.stringify(name)
            console.log(name , 'がログインになりました' , 'ストリング', val);

            saveToLocalStorage();
            
        }  */
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
        <div>
            <div className="login">
                {loginState &&
                    <form className="login_form" onSubmit={ (e) => handleSubmitToLogin(e) }>
                        <h1>Login </h1>                        
                        <input type="email" placeholder="email" value={inputEmail} onChange={ (e) => setInputEmail(e.target.value) } />
                        <input type="password" placeholder="password" value={inputpassword} onChange={ (e) => setInputpassword(e.target.value) } />
                        <button type="submit" >Login</button>
                    </form>
                }
                {!loginState &&  <><button onClick={handleLogOut}>ログアウト</button> {name}さん　こんにちは  </> }
                
                {!loginState &&
                    <div>
                        {/* ログアウト時にはfalseに状態が変更する */}
                        <h2>ユーザー情報</h2>
                        {loginData.slice(1,2).map(user => (
                            <div key={user.id}>
                                名前：{user.username}
                                email:{user.email}<br/>
                                自己紹介: {user.introduction}
                            </div>
                        ))}
                    true
                    </div>
                }
            </div>
        </div>
    )
}

export default Login
