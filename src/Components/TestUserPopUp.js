import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';


const TestUserPopUp = () => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
    };

    const content = `
        メールアドレス : honda@gmail.com\n
        パスワード : hondahonda1111
    `;


    return (
        <div>
            <div>
            <Button onClick={handleClick}>
                <InfoIcon />
                <p style={{fontSize:'12px', fontWeight:'600' , marginLeft:'5px'}}>テストユーザー　ログイン情報を表示</p>
            </Button>

            <div style={{}}>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={content}
                    action={
                    <>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </>
                    }
                />
            </div>
            </div>
        </div>
    )
}

export default TestUserPopUp
