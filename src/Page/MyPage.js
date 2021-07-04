import React, { useContext, useState, useEffect } from 'react';
import { FetchUser } from '../App';
import { PageTitle, EditButton, PageInnerWrapper, PageContentInner, PagePrimaryText, PagePrimaryContent, MyPageUserIcon, PageColumn, PageRow } from '../Style/Style'
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
                <PageTitle>
                    
                    <span>マイページ</span>
                </PageTitle>
            </div>
            

            {!contentEdit ? 
                
                <PageInnerWrapper>
                    <EditButton onClick={() => setContentEdit(!contentEdit)}>編集</EditButton>

                    {fetchUserData.slice(0 ,1).map(((n , idx) => 
                        <PageColumn key={idx}>
                            <MyPageUserIcon src={n.poster} alt={n.username} />
                            <PageRow>
                                <PageContentInner>
                                    <PagePrimaryText>名前 / ニックネーム</PagePrimaryText>
                                    <PagePrimaryContent>{n.username}</PagePrimaryContent>
                                </PageContentInner>
                                <PageContentInner>
                                    <PagePrimaryText>年齢</PagePrimaryText>
                                    <PagePrimaryContent>{n.age}</PagePrimaryContent>
                                </PageContentInner>
                                <PageContentInner>
                                    <PagePrimaryText>所属</PagePrimaryText>
                                    <PagePrimaryContent>{n.team}</PagePrimaryContent>
                                </PageContentInner>
                                <PageContentInner>
                                    <PagePrimaryText>紹介文 / ひとこと</PagePrimaryText>
                                    <PagePrimaryContent>{n.introduction}</PagePrimaryContent>
                                </PageContentInner>
                            </PageRow>
                        </PageColumn>
                    ))}

                </PageInnerWrapper>
            : 

                <PageInnerWrapper>
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
                        <button onClick={() => setContentEdit(contentEdit)}>キャンセル</button>
                        </form>
                    )))}
                </PageInnerWrapper>
            }



        </div>
    )
}

export default MyPage