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
        @media (min-width: 1025px) {
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
    padding: 10px 30px;
    height: 55px;
    font-size: 30px;
`;

export const HomeContainer = styled.div`
    width: 100%;
    display: flex;
    min-width: 800px;
    background: transparent;
`;

export const SideMenu = styled.nav`
    width: 15%;
    border-right: solid 1px #e7e7e7;
    background: transparent;
`;

export const MenuBar = styled.ul`

    li {
        padding: 20px 30px;
        font-size: 14px;
        opacity: 0.8;
        font-weight: 600;
        cursor: pointer;

        &:hover {
            transition: all .3s ease;
            opacity: 1;
            transform:translateX(8px);
        }
    }

`;

export const MainInner = styled.div`
    width: 85%;
`;

export const MainInNavbar = styled.nav`
    width: 100%;
    max-width: 360px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 0 auto;
    padding: 10px 30px;
`;

export const MainArea = styled.div`
    border-top:solid 1px #e7e7e7;
    padding: 20px 30px;
    background: #F5F5F5;
    height: 100%;
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
    padding: 0px 60px;
    padding-right: 0px;
`;

export const PageColumn = styled.div`
    display: flex;
`;

export const PageContentInner = styled.div`
    margin:0 auto 30px;
`;

export const PagePrimaryText = styled.p`
    font-size: 14px;
    line-height: 1.5;
    letter-spacing: 0.02em;
    font-weight: 600;
    color: rgb(91, 134, 229); /* #616161 */
    margin: 0 auto 10px;
`;

export const PagePrimaryContent = styled.p`
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: 0.02em;
    font-weight: 600;
    margin: 0 auto 10px;
    white-space: pre-wrap;
`;

/* ----------------------
    マテリアルUI Icon 調整
------------------------ */

export const TitleIconProps = {
    fontSize : "2rem",
    marginRight : "10px"
}