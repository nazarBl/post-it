import React from 'react'
import style from './UserInfo.module.scss'

export const UserInfo = ({avatarUrl, name, extraInfo}) => {
  return (
    <div className={style.root}>
        <img className={style.avatar} src={avatarUrl || '/noavatar.png'} alt={name} />
        <div className={style.userDetails}>
            <span className={style.userName}>{name}</span>
            <span className={style.extra}>{extraInfo}</span>
        </div>
    </div>
  )
}
