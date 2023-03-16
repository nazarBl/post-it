import React from 'react'
import { UserInfo } from '../UserInfo'
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import style from './Post.module.scss'

export const Post = ({_id, title, text, imageUrl, author, createdAt, tags, viewsCount, commentsCount}) => {
  return (
    <div className={style.root}>
        <img className={style.postImage} src ={imageUrl} alt='title'/>
        <div className={style.wrapper}>
          <UserInfo {...author} extraInfo={createdAt} />
          <div className={style.indention}>
              <h2 className={style.title}>{title}</h2>
              <ul className={style.tags}>
                  {tags.map((name)=>(
                      <li key={name}>#{name}</li>
                  ))}
              </ul>
              <ul className ={style.postDetails}>
                <li>
                  <EyeIcon />
                  <span>{viewsCount}</span>
                </li>
                <li>
                  <CommentIcon />
                  <span>{commentsCount}</span>
                </li>
              </ul>
          </div>
        </div>
    </div>
  )
}
