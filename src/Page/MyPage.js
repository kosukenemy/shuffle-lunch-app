import React, { useContext, useState, useEffect } from 'react';
import { FetchUser } from '../App';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { PageTitle, EditButton, PageInnerWrapper, PageContentInner, PagePrimaryText, PagePrimaryContent, MyPageUserIcon, PageColumn, PageRow, TitleIconProps } from '../Style/Style'
const API = process.env.REACT_APP_BASEAPI
const POST_API_KEY = process.env.REACT_APP_POST_API_KEY


const MyPage = () => {


    const thisUser = useContext(FetchUser);
    const [fetchUserData , setFetchUserData] = useState([]);
    const [contentEdit , setContentEdit] = useState(false);
    const [lunchTime , setLunchTime] = useState("11:00-12:00");
    const [talkTheme , setTalkTheme] = useState("気ままに雑談したい")
    const [lunchJoin , setLunchJoin] = useState("参加");
    const [lunchGenre , setLunchGenre] = useState("和食");
    const [editName , setEditName] = useState("");
    const [editAge , setEditAge] = useState("");
    const [editTeam , setEditTeam] = useState("");
    const [editIntroduction , setEditIntroduction] = useState("");



    const patchData = {
        "lunchState" : lunchJoin,
        "lunchGenre" : lunchGenre,
        "lunchTime" : lunchTime,
        "talkTheme" : talkTheme,
        "username" : editName,
        "age" : editAge,
        "team" : editTeam,
        "introduction" : editIntroduction
    }



    const handleEditSubmit = (e) => {
        e.preventDefault();
        setContentEdit(!contentEdit)
        EditedData();
        console.log(patchData)
    }
    

    useEffect(() => {
        setFetchUserData(thisUser);
        const v_status = thisUser.filter(m => m.lunchState).map( d => d.lunchState);
        const v_genre = thisUser.filter(m => m.lunchGenre).map( d => d.lunchGenre);
        const v_time = thisUser.filter(m => m.lunchTime).map( d => d.lunchTime);
        const v_talk = thisUser.filter(m => m.talkTheme).map( d => d.talkTheme);
        const v_name = thisUser.filter(m => m.username).map( d => d.username);
        const v_age = thisUser.filter(m => m.age).map( d => d.age);
        const v_team = thisUser.filter(m => m.team).map( d => d.team);
        const v_introduction = thisUser.filter(m => m.introduction).map( d => d.introduction);

        setLunchJoin(v_status[0]);
        setLunchGenre(v_genre[0]);
        setLunchGenre(v_time[0]);
        setTalkTheme(v_talk[0]);
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
                    
                    {!contentEdit ?
                        <><AccountCircleIcon style={TitleIconProps} /><span>マイページ</span></>
                        :
                        <><AccountCircleIcon style={TitleIconProps} /><span>マイページ編集</span></>
                        }
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
                                    <PagePrimaryText>プロフィール</PagePrimaryText>
                                    <div>
                                        <PagePrimaryContent><span>所属</span>{n.team}</PagePrimaryContent>
                                        <PagePrimaryContent><span>氏名</span>{n.username}</PagePrimaryContent>
                                        <PagePrimaryContent><span>年齢</span>{n.age} 才</PagePrimaryContent>
                                        <PagePrimaryContent><span>ひとこと</span>{n.introduction}</PagePrimaryContent>
                                    </div>
                                </PageContentInner>
                                
                                <PageContentInner>
                                    <PagePrimaryText>ランチ情報</PagePrimaryText>
                                    <div>
                                        <PagePrimaryContent><span>ランチステータス</span>{n.lunchState}</PagePrimaryContent>
                                        <PagePrimaryContent><span>食べたいご飯のジャンル</span>{n.lunchGenre}</PagePrimaryContent>
                                        <PagePrimaryContent><span>希望時間</span>{n.lunchTime}</PagePrimaryContent>
                                        <PagePrimaryContent><span>話したい話題 </span>{n.talkTheme}</PagePrimaryContent>
                                    </div>
                                </PageContentInner>
                            </PageRow>
                        </PageColumn>
                    ))}

                </PageInnerWrapper>
            : 

                <PageInnerWrapper>
                    <div style={{display:'flex', width:' 260px', margin: '0 0 0 auto'}}>
                        <EditButton onClick={handleEditSubmit} type="submit">保存</EditButton>
                        <EditButton onClick={() => setContentEdit(!contentEdit)}>キャンセル</EditButton>
                    </div>
                    {fetchUserData.slice(0 ,1).map(((n , idx) => (
                        <PageColumn key={idx} onSubmit={(e) => handleEditSubmit(e)}>
                            <form style={{display:'flex'}}>
                                <MyPageUserIcon src={n.poster} alt={n.username} />
                                <PageRow>
                                <PageContentInner>
                                    <PagePrimaryText>プロフィール</PagePrimaryText>
                                    <div>
                                        <PagePrimaryContent>
                                            <span>所属</span>
                                            <input type="text" value={editTeam} onChange={ (e) => setEditTeam(e.target.value) } />
                                        </PagePrimaryContent>
                                        <PagePrimaryContent>
                                            <span>氏名</span>
                                            <input type="text" value={editName} onChange={ (e) => setEditName(e.target.value) } />
                                        </PagePrimaryContent>
                                        <PagePrimaryContent>
                                            <span>年齢</span>
                                            <input type="text" value={editAge} onChange={ (e) => setEditAge(e.target.value) } />
                                        </PagePrimaryContent>
                                        <PagePrimaryContent>
                                            <span>ひとこと</span>
                                            <input type="text" value={editIntroduction} onChange={ (e) => setEditIntroduction(e.target.value) } />
                                        </PagePrimaryContent>
                                    </div>
                                </PageContentInner>
                                
                                <PageContentInner>
                                    <PagePrimaryText>ランチ情報</PagePrimaryText>
                                    <div>
                                        <PagePrimaryContent>
                                            <span>ランチステータス</span>
                                            <label>
                                                <input type="radio" value="参加" onChange={ e => setLunchJoin( e.target.value )}　checked={lunchJoin === "参加"} />参加
                                                <input type="radio" value="不参加" onChange={ e => setLunchJoin( e.target.value )}　checked={lunchJoin === "不参加"} />不参加
                                            </label>
                                        </PagePrimaryContent>

                                        {lunchJoin === "参加"　&&
                                        <>
                                        <PagePrimaryContent>
                                            <span>食べたいご飯のジャンル</span>
                                            <select value={lunchGenre} onChange={ (e) => setLunchGenre( e.target.value )}>
                                                <option value="和食">和食</option>
                                                <option value="洋食">洋食</option>
                                            </select>
                                        </PagePrimaryContent>
                                        <PagePrimaryContent>
                                            <span>希望時間</span>
                                            <select value={lunchTime} onChange={ e => setLunchTime(e.target.value)}>
                                                <option value="11:00-12:00">11:00-12:00</option>
                                                <option value="12:00-13:00">12:00-13:00</option>
                                                <option value="13:00-14:00">13:00-14:00</option>
                                            </select>
                                        </PagePrimaryContent>
                                        <PagePrimaryContent>
                                            <span>話したい話題 </span>
                                            <select value={talkTheme} onChange={ e => setTalkTheme(e.target.value)} >
                                                <option value="キャリアについて相談したい0">キャリアについて相談したい</option>
                                                <option value="気ままに雑談したい">気ままに雑談したい</option>
                                                <option value="業界やビジネスについて聞いてみたい">業界やビジネスについて聞いてみたい</option>
                                            </select>
                                        </PagePrimaryContent>
                                        </>
                                        }
                                    </div>
                                </PageContentInner>
                            </PageRow>
                            </form>
                        </PageColumn>

                    )))}
                </PageInnerWrapper>
            }



        </div>
    )
}

export default MyPage