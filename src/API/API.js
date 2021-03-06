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
        return firebaseData ;
        
    } catch(err) {  console.log(err , '接続できませんでした') }
}


/* --------
ホットペッパー
----------*/
export const FetchHotPepparAPI = async() => {
    try {
        axios.get(`/hotpepper/gourmet/v1/?key=${process.env.REACT_APP_HOTPEPPAR_APIKEY}&keyword=%E5%85%AD%E6%9C%AC%E6%9C%A8&keyword=%E4%B9%83%E6%9C%A8%E5%9D%82&format=json`)
        .then( res => {
            const datas = res.data
            console.log(datas)

            const modifiedData = datas['results'].shop.map(m => ({
                access : m['access'],
                address : m['address'],
                band : m['band'],
                barrier_free : m['barrier_free'],
                budget : m['budget'],
                budget_memo : m['budget_memo'],
                capacity : m['capacity'],
                card : m['card'],
                catch : m['catch'],
                charter : m['charter'],
                child : m['child'],
                close : m['close'],
                coupon_urls : m['coupon_urls'],
                course : m['course'],
                english : m['english'],
                free_drink : m['free_drink'],
                free_food : m['free_food'],
                genre : m['genre'],
                horigotatsu : m['horigotatsu'],
                id : m['id'],
                karaoke: m['karaoke'],
                ktai_coupon : m['ktai_coupon'],
                large_area : m['large_area'],
                large_service_area : m['large_service_area'],
                middle_area : m['middle_area'],
                midnight : m['midnight'],
                mobile_access : m['mobile_access'],
                name : m['name'],
                name_kana : m['name_kana'],
                non_smoking : m['non_smoking'],
                open : m['open'],
                other_memo :m['other_memo'],
                parking : m['parking'],
                party_capacity : m['party_capacity'],
                pet : m['pet'],
                photo :m['photo'],
                private_room : m['private_room'],
                service_area : m['service_area'],
                shop_detail_memo :m['shop_detail_memo'],
                show : m['show'],
                small_area: m['small_area'],
                station_name: m['station_name'],
                tatami: m['tatami'],
                tv: m['tv'],
                urls :m['urls'],
                wedding :m['wedding'],
                wifi : m['wifi']
            }))
            return modifiedData;
        })



    } catch(err) { console.log(err , '接続できませんでした') }
}