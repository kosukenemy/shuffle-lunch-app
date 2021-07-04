import React, { useContext, useState, useEffect } from 'react';
import { FetchUser } from '../App';
const API = process.env.REACT_APP_BASEAPI
const POST_API_KEY = process.env.REACT_APP_POST_API_KEY

const MyPage = () => {


    const thisUser = useContext(FetchUser);
    const [fetchUserData , setFetchUserData] = useState([]);
    const [contentEdit , setContentEdit] = useState(false);

    const [editName , setEditName] = useState("");
    const [editAge , setEditAge] = useState("");
    const [editTeam , setEditTeam] = useState("");
    const [editIntroduction , setEditIntroduction] = useState("");

    const patchData = {
        "username" : editName,
        "age" : editAge,
        "team" : editTeam,
        "introduction" : editIntroduction
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        setContentEdit(!contentEdit)
        EditedData();
        window.location.reload();
    }
    


    useEffect(() => {
        setFetchUserData(thisUser);
        const v_name = thisUser.filter(m => m.username).map( d => d.username);
        const v_age = thisUser.filter(m => m.age).map( d => d.age);
        const v_team = thisUser.filter(m => m.team).map( d => d.team);
        const v_introduction = thisUser.filter(m => m.introduction).map( d => d.introduction);

        setEditName(v_name[0]);
        setEditAge(v_age[0]);
        setEditTeam(v_team[0]);
        setEditIntroduction(v_introduction[0]);
    },[thisUser])





    const getID = fetchUserData.slice(0,1).map(m => m.id);

    const EditedData = () => {
        fetch(`${API}/userlist/${getID}` , {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-WRITE-API-KEY": POST_API_KEY
            },
            body: JSON.stringify(patchData)
        })
    }




    return (
        <div>

            <div>
                <p>マイページ</p>
            </div>
            

            {!contentEdit ? 
                
                <div>
                    <button onClick={() => setContentEdit(!contentEdit)}>編集する</button>

                    {fetchUserData.slice(0 ,1).map(((n , idx) => 
                        <div key={idx}>
                            <div>
                                {/* <img src={n.poster} alt={n.username} /> */}
                            </div>
                            <div>
                                <p id="name">{n.username}</p>
                            </div>
                            <div>
                                <p>{n.age}</p>
                            </div>
                            <div>
                                <p>{n.team}</p>
                            </div>
                            <div>
                                <p>{n.introduction}</p>
                            </div>
                        </div>
                ))}

                </div>
             : 

                <div>

{/*                     <form>
                        名前
                        <input type="text" value={editName} onChange={ (e) => setEditName(e.target.value) } />
                        年齢
                        <input type="text" value={editAge} onChange={ (e) => setEditAge(e.target.value) } />
                    </form> */}

                    {fetchUserData.slice(0 ,1).map(((n , idx) => (
                        <form key={idx} onSubmit={(e) => handleEditSubmit(e)}>
                        名前
                        <input type="text" value={editName} onChange={ (e) => setEditName(e.target.value) } />
                        年齢
                        <input type="text" value={editAge} onChange={ (e) => setEditAge(e.target.value) } />
                        所属
                        <input type="text" value={editTeam} onChange={ (e) => setEditTeam(e.target.value) } />
                        自己紹介
                        <input type="text" value={editIntroduction} onChange={ (e) => setEditIntroduction(e.target.value) } />
                        <button onClick={handleEditSubmit} type="submit">保存</button>
                        </form>
                    )))}
                </div>
            }



        </div>
    )
}

export default MyPage