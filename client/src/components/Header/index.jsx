
import { Button, Container } from '@mui/material';
import React from 'react'
import style from './Header.module.scss'

export const Header = () => {
    const isLoginned = false;
    const logOutHandler = {};

    return (
    <div className={style.wrapper}>
        <Container maxWidth='lg'>
            <div className={style.inner}>
                <a href="jfe">
                    <div className={style.logo} href='/jife'>POST IT</div>
                </a>
                <div className={style.authBtns}>
                    {isLoginned?
                        <>
                            <a href="/posts/create">
                                <Button variant = "contained">New Post</Button>
                            </a>
                            <Button onClick={logOutHandler} variant="contained" color="error">Log Out</Button>
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
