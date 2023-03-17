import React from 'react';
import { UserInfo } from '../UserInfo';
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import clsx from 'clsx';

import style from './Post.module.scss';

export const Post = ({_id, title, text, imageUrl, author, createdAt, tags, viewsCount, commentsCount, children, isFullPost}) => {
  return (
    <div className={clsx(style.root, { [style.rootFull]: isFullPost })}>
        <img className={clsx(style.image, { [style.imageFull]: isFullPost })} src ={imageUrl} alt='title'/>
        <div className={style.wrapper}>
          <UserInfo {...author} extraInfo={createdAt} />
          <div className={style.indention}> 
              <h2 className={clsx(style.title, { [style.titleFull]: isFullPost })}>
                {isFullPost ? title : <a href={`/posts/${_id}`}>{title}</a>}
              </h2>
              <ul className={style.tags}>
                  {tags.map((name)=>(
                   
                      <li key={name}> <a href={`/tag/${name}`}>#{name}</a></li>
                  ))}
              </ul>
              {children && <div className={style.content}>{children}</div>}
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
