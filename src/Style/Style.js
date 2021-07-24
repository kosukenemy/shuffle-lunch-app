import styled,  { createGlobalStyle , css } from 'styled-components';


/* -----------
    media 
------------- */
export const media = {
    desktop: (...args) => css`
    @media (min-width: 1300px) {
        ${ css(...args)}
    }
    `,
        mid: (...args) => css`
        @media (max-width: 1025px) {
            ${ css(...args)}
        }
        `,
    phone: (...args) => css`
    @media (max-width: 480px) {
        ${ css(...args)}
    }
    `
}

// グローバル
export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: "游ゴシック体", YuGothic, "游ゴシック Medium", "Yu Gothic Medium", "游ゴシック", "Yu Gothic", sans-serif;
        background: #FFFDFD;
        overflow-x: hidden;
    }
    input {
        outline: none;
    }
    button {
        border: none;
        cursor: pointer;
        outline: none;
        padding: 0;
        appearance: none;
    }
    a { color:#333;}
    img {
        width: 100%;
    }
    li { list-style: none; }
    ul,p,a,h1,h2,h3,span { 
        text-decoration: none;
        margin: 0;
        padding: 0;
    }
    ul { height:90vh;}
    input,textarea {
    -webkit-appearance: none;
    outline: none;
    }
`;
/* -----------
    テーマ
------------- */
export const GradationType1 = {
    backgroundImage : "linear-gradient(to right, rgb(54, 209, 220) 0%, rgb(91, 134, 229) 51%, rgb(54, 209, 220) 100%)",
    color : "#fff",
    fontWeight : "bold"
}


/* ----------------------
    ログイン周り コンポーネント
------------------------ */

export const LoginArea = styled.form`
    width: 600px;
    margin: 0 auto;
    position: absolute;
    top: 50vh;
    left: 50%;
    transform: translate(-50%, -50%);
    background: transparent;
    text-align: center;

    .new-account {
        font-size: 12px;
    }
`;

export const LoginField = styled.input`
    width: 300px;
    padding: 10px 5px;
    border: 1px solid #e7e7e7;
    background: transparent;
    display: block;
    margin: 10px auto;
`;

export const BasicButton = styled.button`
    width: 310px;
    margin: 0 auto;
    text-align: center;
    display: block;
    padding: 10px 5px; 
    font-weight: 600;

    &:hover {
        transition: all .3s ease-in-out;
        opacity: 0.8;
    }
`;

export const LogOutButton = styled(BasicButton)`
    width: 110px;
    margin:0;
`;

/* ----------------------
    ダッシュボード コンポーネント
------------------------ */
export const HeaderLogo = styled.div`
    display: flex;
    align-items: center;

    .logo {
        padding-right: 30px;
        ${media.mid`
            display: none;
        `}
    }
`;

export const HomeContainer = styled.div`
    display: flex;
    justify-content: space-between;
    background: transparent;
    position: relative;
`;

export const SideMenu = styled.nav`
    width: 200px;
    border-right: solid 1px #e7e7e7;
    background: transparent;
    min-width: 200px;
    position: relative;
    ${media.mid`
        width: 70px;
        min-width: 70px;
    `}

    &.onToggle {

        width: 70px;
        min-width: 70px;
    }
`;

export const ToggleButton = styled.button`
    display: block;
    margin: 0;
    background: transparent;
    padding: 0px 20px;
    ${media.mid`
        margin: 0 auto;
        padding: 0px 0px;
    `}

    &.onToggle__button {
        margin: 0 auto;
        padding: 0px 0px;
    }
`;

export const MenuBar = styled.ul`

    li {
        padding: 20px 20px;
        font-size: 14px;
        opacity: 0.8;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-self: center;
        line-height: 1.85;

            


        &:hover {
            transition: all .3s ease;
            opacity: 1;
            transform:translateX(8px);
        }
    }
    // toggle連動
    .itemMenu {
        ${media.mid`
            display: none;
        `}
        &.onToggle__menu {
            display: none;
        }
    }

`;

export const MainInner = styled.div`
    width: 100%;
    position: relative;
`;

export const MainInNavbar = styled.nav`
    min-height: 56px;
    padding: 10px 30px;
    background: #fff;
    position: sticky;
    top:0;
    left: 0;
    border-bottom: solid 1px #e7e7e7;
    z-index: 99;
`;


export const MainArea = styled.div`
    border-top:solid 1px #e7e7e7;
    padding: 20px 30px;
    background: #F5F5F5;
    min-height: 100vh;
`;

/* ----------------------
    ダッシュボード ：　ユーザー
------------------------ */

export const User = styled.div`
    display: flex;
    align-items: center;
`;

export const UserIcon = styled.img`

    border-radius: 50%;
    width: 50px;
    height: 50px;
    object-fit: cover;
    pointer-events: none;
    border: solid 1px #5563;
    padding: 2px;
`;


export const UserName = styled.span`
    color: #334;
    font-size: 14px;
    text-align: left;
    font-weight: 600;
    padding: 0 15px;
    .name { display:block;}
    .team {
        display: inline-block;
        font-size: 10px;
        color:#3334;
    }

    &:hover { text-decoration:underline; cursor: pointer; }
`;


export const PageTitle = styled.h2`
    font-size: 26px;
    line-height: 1;
    letter-spacing: 0.02em;
    margin: 0px auto 20px;
    display: flex;
    align-items: center;
`;

export const EditButton = styled(BasicButton)`
    width: 110px;
    margin:0 0 0 auto;
`;

/* ----------------------
    マイページ
------------------------ */

export const MyPageUserIcon = styled(UserIcon)`
    width: 100px;
    height: 100px;
    margin: 0;
`;

export const PageInnerWrapper = styled.div`
    background: #fff;
    border: solid 1px #e7e7e7;
    padding:30px;
`;

export const PageRow = styled.div`
    padding: 0px 30px;
    padding-right: 0px;
    min-width: 540px;
    max-width: 540px;
`;

export const PageColumn = styled.div`
    display: flex;
`;

export const PageContentInner = styled.div`
    margin:0 auto 30px;
`;

export const PagePrimaryText = styled.p`
    font-size: 15px;
    line-height: 1.85;
    letter-spacing: 0.02em;
    font-weight: 600;
    color: rgb(91, 134, 229);
    margin: 0 auto 17px;
`;

export const PagePrimaryContent = styled.p`
    font-size: 15px;
    line-height: 1.5;
    letter-spacing: 0.02em;
    font-weight: 600;
    margin: 0 auto 10px;
    white-space: pre-wrap;
    width: 94%;

    span {
        font-size:14px;
        color: #717375;
        padding-right: 15px;
    }
`;

/* マイページ編集 */

export const MyPageInputEdit = styled(LoginField)`
    display: inline;
    margin: 0;
`;

/* ----------------------
    マテリアルUI Icon 調整
------------------------ */

export const TitleIconProps = {
    fontSize : "2rem",
    marginRight : "10px"
}

/* ----------------------
    ユーザー一覧
------------------------ */

export const UserListWrapper = styled.div`
    width:100%;
    display: flex;

`

export const UserInner = styled.div`
    width: 110px;
    text-align: center;
    margin-bottom: 30px;
    padding:0px 10px;

    .il_name,.il_team { 
        display:block;
        text-align: center;
        padding: 0;
    }
    .il_team {
        display: inline-block;
        font-size: 10px;
        color:#3334;
        padding: 0;
    }
`;

/* ----------------------
    チャットリスト
------------------------ */

export const ChatUserList = styled(PageInnerWrapper)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin:0 auto 20px;

`

export const ChatUserListContent = styled.div`
    padding: 0 10px;
    color: #334;
    font-size: 14px;
    text-align: left;
    font-weight: 600;
    .name { display:block;}
`;

/* ----------------------
    チャット
------------------------ */

export const ChatMessageContainer = styled.div`

`;

export const ChatMessage = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 20px 0;

/*     &:nth-child(even) {
        flex-direction: row-reverse;

        .balloon1-left {
            margin: 0 1.5rem 0 0;
            transform:scale(-1,1)
        }
        p {
            transform:inherit;
        }
        .date {
            text-align: left;
        }
    } */
`;

export const MessageInner = styled.div`

    .balloon1-left{
        position:relative;
        margin: 0 0 0 1.5rem;
        width: 420px;
        height: 60px;
        background:#fff;
        padding:20px;
        text-align:left;
        color:#333333;
        font-size:16px;
        font-weight:bold;
        border-radius:18px;
        -webkit-border-radius:18px;
        -moz-border-radius:18px;
        box-shadow: 0px 0px 10px -5px #777777;


        &::after{
            border: solid transparent;
            content:'';
            height:0;
            width:0;
            pointer-events:none;
            position:absolute;
            border-color: rgba(15, 181, 255, 0);
            border-top-width:10px;
            border-bottom-width:10px;
            border-left-width:10px;
            border-right-width:10px;
            margin-top: -10px;
            border-right-color:#fff;
            right:100%;
            top:27%;
        }
    }




    .balloon1-left p {
        margin: 0;
        padding: 0;
    }

    .date {
        display: block;
        text-align: right;
        font-size:12px;
    }
`;

export const ChatInputInner = styled.form`
    position: sticky;
    bottom: 0;
    left: 0;
    padding: 10px 30px;
`;

export const ChatInputField = styled.textarea`
    width: 100%;
    resize: none;
    min-height: 140px;
`;

export const ChatSubmitButton = styled(BasicButton)`
    width: 200px;
    margin:0;
`;

/* ----------------------
    周辺のお店
------------------------ */
export const ShopList = styled.div`
    display: flex;
    margin: 30px 0px;
    border: solid 1px #e7e7e7;
    border-radius: 8px;
    overflow: hidden;
    max-width: 1300px;
    min-width: 700px;
`;

export const ShopThumbnail = styled.div`
    width: 270px;



    img {
        width:100%;
        height: 190px;
        min-height: 220px;
        object-fit: cover;
        vertical-align: top;
        
    }

    .shopName {
        text-align: left;
        font-size: 12px;
        font-weight: 600;
    }
`;

export const ShopContent = styled.div`
    width: 100%;
    padding: 10px 20px;
    position: relative;

    .button__inner {
        position:absolute;
        bottom: 20px;
        right: 20px;
    }
`;

export const MiniButton = styled.a`
    background: gray;
    display: block;
    width: 100px;
    margin: 3px;
    text-align: center;
    padding: 10px 0px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px;
    margin: 0 0 0 auto;
`;