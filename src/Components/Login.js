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
    const [matchUserData ,setMatchUserData ] = useState([]);
    const [loginData , setLoginData] = useState([]);

    useEffect(() => {
        const FetchAPI = async() => {
            setMatchUserData( await fetchUserlist(username) );
        }
        FetchAPI();
    },[username , name ])

    useEffect(() => { } , [loginData])

    const saveToLocalStorage = () => {
        window.localStorage.setItem("login", name);
    };

    function clearLocalStorage() {
        window.localStorage.clear();
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // ユーザー検索
        if(matchUserData.map(m => (m.username)).includes(name)) {
            
            const val = JSON.stringify(name)
            console.log(name , 'がログインになりました' , 'ストリング', val);

            saveToLocalStorage();
            
        } else {
            alert('ユーザー名はありません')
        }       
    }

    // 入力されたキーワードからインデックス番号を取得
    const i =  matchUserData.findIndex(({username}) => username === name);
    loginData.push(matchUserData[i]);
    console.log(loginData)

    return (
        <div>
            <div className="login">
                <form className="login_form" onSubmit={ (e) => handleSubmit(e) }>
                    <h1>Login Here!</h1>
                    <input id="username" type="name" placeholder="Name" value={name} onChange={ (e) => setName(e.target.value) } />
                    <button type="submit" >Login</button>
                </form>
                {name}さん　こんにちは
                <button onClick={clearLocalStorage}>ログアウト</button>

                <h2>ユーザー情報</h2>
                {/* ログアウト時にFalseにする必要がある。 */}
                {loginData.slice(1,2).map(user => (
                    <div key={user.id}>
                        名前：{user.username}
                        email:{user.email}<br/>
                        自己紹介: {user.introduction}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Login
