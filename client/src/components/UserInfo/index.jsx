import React from 'react'
import style from './UserInfo.module.scss'

export const UserInfo = ({avatarUrl, fullName, extraInfo}) => {
  return (
    <div className={style.root}>
        <img className={style.avatar} src={avatarUrl? `http://localhost:7000${avatarUrl}` : '/noavatar.png'} alt={fullName} />
        <div className={style.userDetails}>
            <span className={style.userName}>{fullName}</span>
            <span className={style.extra}>{extraInfo}</span>
        </div>
    </div>
  )
}
