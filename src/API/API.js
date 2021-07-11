
import axios from 'axios';
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
        
    } catch(err) {  console.log(err , 'firebaseに接続できませんでした') }
}





