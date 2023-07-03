
import style from './Profile.module.scss'
import React from 'react'
import {Button, Paper, TextField} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuthMe, fetchUpdateMe } from '../../redux/slices/authSlice'
import axios from '../../axios.js'

export const Profile = () => {
  const [isEditing, setIsEditing] = React.useState(false)

  const [userAvatar, setUserAvatar] = React.useState()
  const [fullName, setFullName] = React.useState()
  const [email, setEmail] = React.useState()
  
  const avatarRef = React.useRef()
  const dispatch = useDispatch()

  React.useEffect(()=>{
    dispatch(fetchAuthMe()).then(data=>{
    setFullName(data.fullName)
    setEmail(data.email)
    setUserAvatar(data.avatarUrl)
    }) // got data to redux state from server
  },[dispatch, isEditing])

  const userData = useSelector(state=>state.auth.userData)
  const onEditClick = () => {
    setIsEditing(true)
    setFullName(userData.fullName)
    setEmail(userData.email)
    setUserAvatar(userData.avatarUrl)
  }

  const onSaveClick = () => {
    try {
      console.log('Data to send: '+{fullName, email, userAvatar})
      const params = {
        fullName,
        email,
        avatarUrl: userAvatar,
      }
    
    dispatch(fetchUpdateMe(params))
    setIsEditing(false)
    } catch (error) {
      console.log(`Error while try update user: ${error}`)
    }
  }

  const onChangeAvatar = async (event) => {
    try {

    const newAvatar = event.target.files[0] // get file from input through event
    const formData = new FormData()
    formData.append('userAvatar', newAvatar)
    const {data} = await axios.post('/upload/avatar', formData)
    setUserAvatar(data.url)

    } catch (error) {
      console.log(error)
    }
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

        
          {userData? <div className={style.userInfo}> 
            {isEditing? <>
              <TextField size='small' value={fullName} onChange={e=>setFullName(e.target.value)}/>
              <TextField size='small' value={email} onChange={e=>setEmail(e.target.value)}/>
              <TextField size='small' value={userData.regTime} InputProps={{readOnly: true,}}/>
            </> :

            // Input data from redux into UI
            <> 
              <h3>{userData?userData.fullName:fullName}</h3>
              <h3>{userData.email}</h3>
              <h3>{userData.regTime}</h3>
            </>
              }
          </div>:''}
        
        {isEditing?
          <div className = {style.editAvatarBtn}>
          <Button variant = "outlined" onClick={()=>avatarRef.current.click()}>Load Avatar</Button>
          <input type='file' ref={avatarRef} hidden onChange = {(event)=>onChangeAvatar(event)}/>
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