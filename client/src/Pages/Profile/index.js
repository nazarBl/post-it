
import style from './Profile.module.scss'
import React from 'react'
import {Button, Paper, TextField} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuthMe } from '../../redux/slices/auth'

export const Profile = () => {
  const [isEditing, setIsEditing] = React.useState(false)
  const avatarRef = React.useRef()
  const dispatch = useDispatch();

  React.useEffect(()=>{
    dispatch(fetchAuthMe); // got data to redux state from server
  },[dispatch])

  const userData = useSelector(state=>state.auth.userData);
  
  const onEditClick = () =>{
    setIsEditing(true)
  }

  const onSaveClick = () => {
    setIsEditing(false)
  }

  return (
    <div className={style.wrapper}>
      <Paper className = {style.paper}>
        <h2>User's Profile</h2>
        <img  src={userData ? `http://localhost:7000${userData.avatarUrl}` : '/noavatar.png'} alt='user avatar' className = {style.userAvatar}/>
        <div className={style.infoForm}>
          <h3>Full name:</h3>
          <h3>E-mail:</h3>
          <h3>Created at:</h3>
        </div>

        
          <div className={style.userInfo}>
          {isEditing? <>
            <TextField size='small' value={userData.fullName}/>
            <TextField size='small' value={userData.email}/>
            <TextField size='small' value={userData.regTime} InputProps={{readOnly: true,}}/>
          </> :

          // Input data from redux into UI
          <> 
            <h3>{userData.fullName}</h3>
            <h3>{userData.email}</h3>
            <h3>{userData.regTime}</h3>
          </>
            }
          </div>
        
        {isEditing?
          <div className = {style.editAvatarBtn}>
          <Button variant = "outlined" onClick={()=>avatarRef.current.click()}>Load Avatar</Button>
          <input type='file' ref={avatarRef} hidden />
          </div>
        :''}
        
        
        {isEditing?
          <div className={style.buttonBlock}>
            <Button variant="contained" onClick ={()=>onSaveClick()}>Save</Button>
          </div>
             : 
          <div className={style.buttonBlock}>
            <Button variant="contained" onClick ={()=>onEditClick()}>Edit</Button>
          </div>
          }
      </Paper>
    </div>
  )
}