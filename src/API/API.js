
/* import axios from 'axios'; */
import { db } from './Firebase';


/* --------
ユーザー一覧
----------*/
// firebase 
export const FetchUserlistData = async() => {
    try {
        const firebaseData = [];

        await db.collection('userlist').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                firebaseData.push(doc.data())    
            })
        })
        return firebaseData;
        
    } catch(err) {  console.log(err , '接続できませんでした') }
}

/* --------
チャット一覧
----------*/
export const FetchChatlistData = async() => {
    try {
        const firebaseData = [];

        await db.collection('chatlist').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                firebaseData.push(doc.data())    
            })
        })
        return firebaseData;
        
    } catch(err) {  console.log(err , '接続できませんでした') }
}




