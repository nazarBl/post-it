
import { Button, Container } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import style from './Header.module.scss'

export const Header = () => {
    const isLoginned = true;
    const onClickLogOut = ()=>{};

    return (
    <div className={style.wrapper}>
        <Container maxWidth='lg'>
            <div className={style.inner}>
                <Link to="/">
                    <div className={style.logo}>POST IT</div>
                </Link>
                <div className={style.authBtns}>
                    {isLoginned?
                        <>
                            <Link to="/posts/create">
                                <Button variant = "contained">New Post</Button>
                            </Link>
                            <Button onClick={onClickLogOut} variant="contained" color="error">Log Out</Button>
                        </>:
                        <>
                            <Link to="auth/login">
                                <Button variant = "outlined">Sign In</Button>
                            </Link>
                            <Link to="auth/registration">
                                <Button variant ="contained" color = "primary">Sign Up</Button>
                            </Link>
                        </>
                    }
                </div>
            </div>
        </Container>
    </div>
    )
}
