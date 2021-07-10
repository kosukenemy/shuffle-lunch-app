import React, { useContext, useState, useEffect } from 'react';
import { FetchUser } from '../App';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { db } from '../API/Firebase';
import { storage } from '../API/Firebase'
import { PageTitle, EditButton, PageInnerWrapper, PageContentInner, PagePrimaryText, PagePrimaryContent, MyPageUserIcon, PageColumn, PageRow, TitleIconProps, MyPageInputEdit } from '../Style/Style';



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
    const [firebaseUserID , setFireBaseUserID ] = useState("");
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(100);



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
        const v_id = thisUser.filter(m => m.id).map( d => d.id);
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
        setFireBaseUserID(v_id[0])

    },[thisUser])


    const EditedData = () => {
        (async () => {
            try {
                const userRef = db.collection('userlist').doc(firebaseUserID)
                await userRef.update({
                    "profile_image" : imageUrl,
                    "lunchState" : lunchJoin,
                    "lunchGenre" : lunchGenre,
                    "lunchTime" : lunchTime,
                    "talkTheme" : talkTheme,
                    "username" : editName,
                    "age" : editAge,
                    "team" : editTeam,
                    "introduction" : editIntroduction,
                })
        } catch (err) {
            console.log(`Error: ${JSON.stringify(err)}`)
        }
        })()

        setTimeout(() => {
            window.location.reload();
        },1000)
    }

    const handleImage = (e) => {
        const image = e.target.files[0]
        setImage(image);
        console.log(image);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        if (image === "") {
            console.log("ファイルが選択されていません");
            setError("ファイルが選択されていません");
        return;
        }
        // アップロード処理
        console.log("アップロード処理");
        const storageRef = storage.ref("images/userProfile/"); //どのフォルダの配下に入れるかを設定
        const imagesRef = storageRef.child(image.name); //ファイル名
    
        console.log("ファイルをアップする行為");
        const upLoadTask = imagesRef.put(image);
        console.log("タスク実行前");
    
        upLoadTask.on(
            "state_changed",
            (snapshot) => {
                console.log("snapshot", snapshot);
                const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(percent + "% done");
                setProgress(percent);
            },
            (error) => {
                console.log("err", error);
                setError("ファイルアップに失敗しました。" + error);
                setProgress(100); //実行中のバーを消す
            },
            () => {
                upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log("File available at", downloadURL);
                setImageUrl(downloadURL);
                });
            }
        );
    };

    

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
                            <MyPageUserIcon src={n.profile_image} alt={n.username} />
                            <PageRow>
                                <PageContentInner>
                                    <PagePrimaryText>プロフィール</PagePrimaryText>
                                    <div>
                                        <PagePrimaryContent><span>所属</span>{n.team}</PagePrimaryContent>
                                        <PagePrimaryContent><span>氏名</span>{n.username}</PagePrimaryContent>
                                        <PagePrimaryContent><span>年齢</span>{n.age} 才</PagePrimaryContent>
                                        <PagePrimaryContent><span>一言</span>{n.introduction}</PagePrimaryContent>
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
                                <MyPageUserIcon src={n.profile_image} alt={n.username} />
                                <PageRow>
                                <PageContentInner>
                                    <PagePrimaryText>プロフィール</PagePrimaryText>
                                    <div>
                                        <PagePrimaryContent>
                                            <span>画像</span>
                                            <input type="file" onChange={handleImage} />
                                            <button onClick={onSubmit}>アップロード</button>
                                        </PagePrimaryContent>
                                        <PagePrimaryContent>
                                            <span>所属</span>
                                            <MyPageInputEdit type="text" value={editTeam} onChange={ (e) => setEditTeam(e.target.value) } />
                                        </PagePrimaryContent>
                                        <PagePrimaryContent>
                                            <span>氏名</span>
                                            <MyPageInputEdit type="text" value={editName} onChange={ (e) => setEditName(e.target.value) } />
                                        </PagePrimaryContent>
                                        <PagePrimaryContent>
                                            <span>年齢</span>
                                            <MyPageInputEdit type="number" value={editAge} onChange={ (e) => setEditAge(e.target.value) } />
                                        </PagePrimaryContent>
                                        <PagePrimaryContent>
                                            <span>一言</span>
                                            <MyPageInputEdit type="text" value={editIntroduction} onChange={ (e) => setEditIntroduction(e.target.value) } />
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