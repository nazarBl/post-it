
import style from './Profile.module.scss'
import React from 'react'
import {Button, Paper} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import { fetchAuthMe } from '../../redux/slices/auth'

export const Profile = () => {
  const dispatch = useDispatch();

  React.useEffect(()=>{
    dispatch(fetchAuthMe);
  },[dispatch])
  
  const userData = useSelector(state=>state.auth.userData);

  return (
    <div className={style.wrapper}>
      <Paper className = {style.paper}>
        <h2>User's Profile</h2>
        <img src='/noavatar.png' alt='user avatar'/>
        <div className={style.infoForm}>
          <h3>Full name</h3>
          <h3>E-mail</h3>
          <h3>Create data</h3>
        </div>
        <div className={style.userInfo}>
          {userData?( <><h3>{userData.name}</h3>
          <h3>{userData.email}</h3>
          <h3>{userData.regTime}</h3></>):('')}
        </div>
        <Button variant="contained">Edit</Button>
      </Paper>
    </div>

  )
}
