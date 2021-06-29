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
    img {
        width: 100%;
    }
    p,a,h1,h2,h3,span { 
        text-decoration: none;
        margin: 0;
        padding: 0;
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
`;

export const LogOutButton = styled(BasicButton)`
    width: 110px;
    margin:0;
`;

/* ----------------------
    ダッシュボード コンポーネント
------------------------ */

export const UserIcon = styled.img`

    border-radius: 50%;
    width: 80px;
    height: 80px;
    object-fit: cover;
`;