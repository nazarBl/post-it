import React from "react";

import style from './CommentsBlock.module.scss'
import { SideBlock } from "../SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Clear";
import CheckIcon from '@mui/icons-material/Check';
import { fetchCommentsByPostId, fetchDeleteComment, fetchUpdateComment} from "../../redux/slices/commentsSlice";

export const CommentsBlock = ({isLoading=true, postId}) => {
  const comments = useSelector(state=>state.comments.items)
  const userId = useSelector(state=>state.auth.userData?._id)
  const dispatch = useDispatch()
  const [commentText,setCommentText] = React.useState();

  const updateComment = (event,commentId, params) => {
    event.preventDefault()
    const updateParams = {
      ...params,
      commentId,
    }
    dispatch(fetchUpdateComment(updateParams)).then(
      oldComment => dispatch(fetchCommentsByPostId(postId))
    )
  }

  const onChangeEditTextComment = (e) =>{
    setCommentText(e.target.value)
  }

  const removeComment = (commentId) => {
    dispatch(fetchDeleteComment(commentId)).then(res=>{
      dispatch(fetchCommentsByPostId(postId))
    })
  }

  if(comments) {
    isLoading = false
  }
  return (
    <SideBlock title="Comments">
        <List>
        {(isLoading ? [...Array(5)] : comments).map((comment, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">

              {/* AVATAR HTML */}
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={'user avatar'} src={comment?`http://localhost:7000${comment.user.avatarUrl}`:'/noavatar.png'} />
                )}
              </ListItemAvatar>

              {(isLoading) ? (
                <div className={style.commentSkeleton}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <div className={style.commentWrapper}>
                  {!comment.isEditable ? 
                    <ListItemText
                      primary={`${comment.user.fullName}` }
                      secondary={comment.text}
                    /> 
                    : 
                    <>
                      { userId===comment.user._id ? 
                        (<div className = {style.editSector}>
                          <ListItemText
                          primary={`${comment.user.fullName}` }
                          />
                          <TextField 
                            label="Edit your comment"
                            size="small"
                            color="secondary"
                            defaultValue={comment.text}
                            onChange={(e)=>onChangeEditTextComment(e)}
                        />
                        </div>) :
                        <ListItemText
                        primary={`${comment.user.fullName}` }
                        secondary={comment.text}
                        /> }
                    </>
                  }
                  { userId===comment.user._id ? 
                  (<div className={style.acceptBtn}>
                    {comment.isEditable ? 
                    <div>
                      <IconButton color="primary" onClick = {(e)=>updateComment(e,comment._id, {text:commentText, isEditable:false})}>
                        <CheckIcon />
                      </IconButton>
                    </div> 
                      :
                    <div className={style.editBtns}>
                      <IconButton color="primary" onClick = {(e)=>updateComment(e,comment._id, {isEditable:true})}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick = {()=>removeComment(comment._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>}
                    
                  </div>)

                  : ''
                  }

                </div>
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </SideBlock>
  );
};