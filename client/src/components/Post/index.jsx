import React from 'react';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from "./Skeleton";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import clsx from 'clsx';

import style from './Post.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchRemovePost } from '../../redux/slices/homeSlice';

export const Post = ({_id, title, text, imageUrl, dateOfCreate, author, createdAt, tags, viewsCount, commentsCount, children, isFullPost, isLoading, isEditable}) => {
  const dispatch = useDispatch();
 
  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () =>{
    if (window.confirm('Are you sure you want delete this post?')){
      dispatch(fetchRemovePost(_id))
    }
    
  }
  return (
    <div className={clsx(style.root, { [style.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={style.editButtons}> 
          <Link to={`/post/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick = {onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
        {imageUrl && (<img className={clsx(style.image, { [style.imageFull]: isFullPost })} 
        src ={imageUrl} 
        alt='title'
        />)}
        
        <div className={style.wrapper}>
          <UserInfo {...author} extraInfo={dateOfCreate} />
          <div className={style.indention}> 
              <h2 className={clsx(style.title, { [style.titleFull]: isFullPost })}>
                {isFullPost ? title : <Link to={`/post/${_id}`}>{title}</Link>}
              </h2>
              <ul className={style.tags}>
                  {tags?tags.map((name)=>(
                   
                      <li key={name}> <Link to={`/posts/${name}`}>#{name}</Link></li>
                  )):''}
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
