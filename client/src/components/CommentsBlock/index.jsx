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
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Clear";
import { fetchCommentsByPostId, fetchDeleteComment } from "../../redux/slices/commentsSlice";
import { useParams } from "react-router-dom";

export const CommentsBlock = ({isLoading=true}) => {
  const comments = useSelector(state=>state.comments.items)
  const userId = useSelector(state=>state.auth.userData?._id)
  const {id} = useParams()
  const dispatch = useDispatch()
  console.log(comments)

  const removeComment = (commentId) => {
    dispatch(fetchDeleteComment(commentId)).then(res=>{
      dispatch(fetchCommentsByPostId(id))
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

                  <ListItemText
                    primary={`${comment.user.fullName}` }
                    secondary={comment.text}
                  />
                  { userId===comment.user._id ? 
                  (<div className={style.editBtns}>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick = {e=>removeComment(comment._id)}>
                      <DeleteIcon />
                    </IconButton>
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