
import style from './Profile.module.scss'
import React from 'react'
import {Button, Paper, TextField} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import { fetchAuthMe, fetchUpdateMe } from '../../redux/slices/auth'

export const Profile = () => {
  const [fullName, setFullName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [avatarUrl, setAvatarUrl] = React.useState('')
  const [isEditing, setIsEditing] = React.useState(false)
  const dispatch = useDispatch();

  React.useEffect(()=>{ // get info from backend and write to Redux
    dispatch(fetchAuthMe());  
  },[dispatch, isEditing])
  
  const userData = useSelector(state=>state.auth.userData); // get data from redux
  
  const onEditClick = async ()=>{
    await setFullName(userData.fullName);
    await setEmail(userData.email);
    await setAvatarUrl(userData.avatarUrl)
    setIsEditing(true);
  }
  const onSaveSubmit = async (fullName, email, avatarUrl)=>{
    const values = {fullName, email, avatarUrl};
    // axios.patch('/auth/me', values)
    await dispatch(fetchUpdateMe(values))
    setIsEditing(false)
  }


  return (
    <div className={style.wrapper}>
      <Paper className = {style.paper}>
        <h2>User's Profile</h2>
        {avatarUrl?<img src = {avatarUrl} alt='user avatar'/>:
        <img src='/noavatar.png' alt='user avatar'/>} 
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
        <div className = {style.editAvatarBtn}>
            <Button variant = "outlined">Load Avatar</Button>
        </div>
        {isEditing?
          <div className={style.buttonBlock}>
            <Button variant="contained" onClick={()=>onSaveSubmit(fullName, email, avatarUrl)}>Save</Button>
          </div>
             : 
          <div className={style.buttonBlock}>
            <Button variant="contained" onClick={()=> onEditClick()}>Edit</Button>
          </div>
          }
      </Paper>
    </div>
  )
}