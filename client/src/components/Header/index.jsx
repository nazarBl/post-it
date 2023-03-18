
import { Button, Container } from '@mui/material';
import React from 'react'
import style from './Header.module.scss'

export const Header = () => {
    const isLoginned = true;
    const onClickLogOut = ()=>{};

    return (
    <div className={style.wrapper}>
        <Container maxWidth='lg'>
            <div className={style.inner}>
                <a href="/">
                    <div className={style.logo}>POST IT</div>
                </a>
                <div className={style.authBtns}>
                    {isLoginned?
                        <>
                            <a href="/posts/create">
                                <Button variant = "contained">New Post</Button>
                            </a>
                            <Button onClick={onClickLogOut} variant="contained" color="error">Log Out</Button>
                        </>:
                        <>
                            <a href="auth/login">
                                <Button variant = "outlined">Sign In</Button>
                            </a>
                            <a href="auth/registration">
                                <Button variant ="contained" color = "primary">Sign Up</Button>
                            </a>
                        </>
                    }
                </div>
            </div>
        </Container>
    </div>
    )
}
