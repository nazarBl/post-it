
import style from './Profile.module.scss'
import React from 'react'
import {Button, Paper, TextField} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import { fetchAuthMe } from '../../redux/slices/auth'
import {Link} from 'react-router-dom'
import axios from '../../axios.js'

export const Profile = () => {
  const [fullName, setFullName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const dispatch = useDispatch();
  let isEditing = false;

  React.useEffect(()=>{ // get info from backend and write to Redux
    dispatch(fetchAuthMe()).then(res=>{
      setFullName(res.fullName);
      setEmail(res.email)
    });
  },[dispatch])
  
  const userData = useSelector(state=>state.auth.userData); // get data from redux
  
 
  
  if(window.location.pathname==='/auth/me/edit') {
    isEditing = true;
  }

  const updateUser = (fullName, email)=>{
    axios.patch('/auth/me',{fullName, email})
  }

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
        {userData?<div className={style.userInfo}>
          {isEditing? <>
            <TextField size='small' value={fullName} onChange={(e)=>setFullName(e.target.value)}/>
            <TextField size='small' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <TextField size='small' value={userData.regTime} disabled={true}/>
          </>:
          <>
            <h3>{userData.fullName}</h3>
            <h3>{userData.email}</h3>
            <h3>{userData.regTime}</h3>
          </>
            }
        </div>:''}
        {isEditing?
          <Link className={style.buttonBlock} to = "/auth/me">
            <Button variant="contained" onClick={()=>updateUser(fullName, email)}>Save</Button>
          </Link>
             : 
          <Link className = {style.buttonBlock} to = "/auth/me/edit">
            <Button variant="contained" >Edit</Button>
          </Link>
          }
      </Paper>
    </div>
  )
}