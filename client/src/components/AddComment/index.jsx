import React, { useRef, useState } from "react";

import style from "./AddComment.module.scss";

import { Avatar, Button, TextField} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom"
import { fetchCommentsByPostId} from "../../redux/slices/commentsSlice";
import axios from "../../axios.js";

export const AddComment = () => {
  const dispatch = useDispatch();
  const userAvatar = useSelector(state=>state.auth.userData.avatarUrl)
  const {id} = useParams()
  const [commentText, setCommentText] = useState('')
  const textAreaRef = useRef()
  const params = {
    commentText,
    parentPost:id,
  }
  const sumbitComment = (params)=>{
    axios.post('/comments/newComment', params).then(res=>{
      dispatch(fetchCommentsByPostId(id))
      textAreaRef.current.value=''
      console.log(textAreaRef.current.lastChild)
    })
  }
  const changeCommentText = (event) => {
    const newText = event.target.value
    setCommentText(newText)
  }
  return (
    <>
      <div className={style.root}>
        <Avatar
          classes={{ root: style.avatar }}
          src={userAvatar?`http://localhost:7000${userAvatar}`:'/noavatar.png'}
        />
        <div className={style.form}>
          <TextField
            label="Leave a comment..."
            variant="outlined"
            ref={textAreaRef}
            maxRows={10}
            onChange={(e)=>changeCommentText(e)}
            multiline
            fullWidth
          />
          <Button variant="contained" onClick ={()=>sumbitComment(params)}>Send</Button>
        </div>
      </div>
    </>
  );
};