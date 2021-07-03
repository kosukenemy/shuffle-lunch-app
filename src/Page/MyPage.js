import React, { useContext, useState, useEffect } from 'react';
import { FetchUser } from '../App';

const MyPage = () => {

    const thisUser = useContext(FetchUser);
    const [fetchUserData , setFetchUserData] = useState([{}]);
    const [contentEdit , setContentEdit] = useState([]);
    const [editName , setEditName] = useState([]);

    useEffect(() => {
        setFetchUserData(thisUser.concat(fetchUserData));
    },[thisUser])


    const UserID  = fetchUserData[0].id;
    console.log(UserID , fetchUserData)

    return (
        <div>

            <div>
                <p>マイページ</p>
            </div>
            

            {!contentEdit ? (
                
                <div>
                    <button onClick={() => setContentEdit(!contentEdit)}>編集する</button>

                    {fetchUserData.slice(0 ,1).map(((n , idx) => (
                        <div key={idx}>
                            <div>
                                <p>プロフィール画像</p>
                                <img src={n.poster} alt={n.username} />
                            </div>
                            <div>
                                <p>ユーザー名</p>
                                <p>{n.username}</p>
                            </div>
                            <div>
                                <p>所属</p>
                                <p>{n.team}</p>
                            </div>
                            <div>
                                < >ひとこと</>
                                <p>{n.introduction}</p>
                            </div>
                        </div>
                )))}

                </div>
            ) : (

                <div>
                    <button onClick={() => setContentEdit(!contentEdit)}>編集を終了する</button>

                    <form>
                        <input type="text" value={editName} onChange={ (e) => setEditName(e.target.value) } />
                    </form>
                </div>
            )}



        </div>
    )
}

export default MyPage