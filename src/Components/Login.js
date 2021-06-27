import React , { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { fetchUserlist } from '../API/API';

const Login = () => {
    let { username } = useParams();

    const [name ,setName] = useState(
        window.localStorage.getItem("login") == null
            ? ""
            : window.localStorage.getItem("login")
        );
    // ログイン方法 email / password
    const [inputEmail, setInputEmail] = useState("");
    const [inputpassword ,setInputpassword] = useState("")
    const [matchUserData ,setMatchUserData ] = useState([]);
    const [loginData] = useState([]);
    const [loginState , SetLoginState ] = useState(
        window.localStorage.getItem("loginState") ? false : true
    );

    useEffect(() => {
        const FetchAPI = async() => {
            setMatchUserData( await fetchUserlist(username) );
        }
        FetchAPI();
    },[username])


    const saveToLocalStorage = () => {
        window.localStorage.setItem("login", name);
        window.localStorage.setItem("loginState", loginState);
        console.log(window.localStorage.setItem("loginState", loginState))
    };
    console.log(loginState)


    const handleLogOut = () => {
        let clear = "";
        setInputEmail(clear);
        setInputpassword(clear);
        window.localStorage.clear();
        window.location.reload();
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // ユーザー検索
/*         if(matchUserData.map(m => (m.username)).includes(name)) {
            SetLoginState(!loginState)
            const val = JSON.stringify(name)
            console.log(name , 'がログインになりました' , 'ストリング', val);

            saveToLocalStorage();
            
        }  */
        // submitされた時にjsonからユーザ情報を検索
        if(matchUserData.map(m => (m.email)).includes(inputEmail)) {
            if(matchUserData.map(m => (m.password)).includes(inputpassword)) {
                SetLoginState(!loginState)
                saveToLocalStorage();
            }

                
        } else {
            alert('ユーザー名はありません')
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
                    <form className="login_form" onSubmit={ (e) => handleSubmit(e) }>
                        <h1>Login </h1>                        
                        <input type="email" placeholder="email" value={inputEmail} onChange={ (e) => setInputEmail(e.target.value) } />
                        <input type="password" placeholder="password" value={inputpassword} onChange={ (e) => setInputpassword(e.target.value) } />
                        <button type="submit" >Login</button>
                    </form>
                }
                {!loginState &&  <><button onClick={handleLogOut}>ログアウト</button> {name}さん　こんにちは  </> }
                
                {!loginState &&
                    <div>
                        <h2>ユーザー情報</h2>
                    {/* ログアウト時にfalse */}
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
