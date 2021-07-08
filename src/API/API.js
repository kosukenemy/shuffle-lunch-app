
import axios from 'axios';
import { db } from './Firebase';
const API = process.env.REACT_APP_BASEAPI
const GET_API_KEY = process.env.REACT_APP_GET_API_KEY
/* const POST_API_KEY = process.env.REACT_APP_POST_API_KEY */





/* --------
ユーザー一覧
----------*/
export const fetchUserlist = async() => {
    try {
        const {data} = await axios.get(`${API}/userlist` , {
            headers: {
                "X-API-KEY": GET_API_KEY
            }
        })
        const modifiedData = data['contents'].map((m) => ({
            id : m['id'],
            username :m['username'],
            gender :m['gender'],
            team : m['team'],
            poster : m['profile_images'].url,
            age : m['age'],
            introduction : m['introduction'],
            lunchState : m['lunchState'],
            lunchGenre : m['lunchGenre'],
            lunchTime :m['lunchTime'],
            talkTheme : m['talkTheme'],
            email: m['email'],
            password : m['password']
        }))
        return modifiedData;

    } catch(err) { console.log(err , 'エラー') }
}

/* --------
ユーザー詳細
----------*/

export const fetchUserDetail = async (id) => {

    try {
        const {data} = await axios.get(`${API}/userlist/${id}` , {
            headers: {
                "X-API-KEY": GET_API_KEY
            }
        })
        return data;

    } catch(err) { console.log(err , 'エラー') }
}



// firebase 
export const FetchUserlistData = async() => {
    try {
        const firebaseData = [];
        await db.collection('userlist').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                firebaseData.push(doc.data())
                console.log(firebaseData)

            })
        })
        return firebaseData;
        
    } catch(err) {  console.log(err , 'firebaseに接続できませんでした') }
}

        

