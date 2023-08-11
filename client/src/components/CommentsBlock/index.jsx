import React from "react";

import { SideBlock } from "../SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch} from "react-redux";

import { fetchCommentsByPostId, fetchDeleteComment, fetchUpdateComment } from "../../redux/slices/commentsSlice";
import Comment from "../Comment";

export const CommentsBlock = ({userId, postId, isEditingComment, comments, isLoading=true}) => {
  const dispatch = useDispatch()

  const [commentText,setCommentText] = React.useState();
  
  const updateComment = (event,commentId, params) => {
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
  return (
    <SideBlock title="Comments">
        <List>
        {(isLoading ? [...Array(5)] : comments).map((comment, index) => (
          // Why need React.Fragment and ListItem here???
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

                <Comment
                  isLoading = {isLoading}
                  comment = {comment} 
                  userId = {userId}
                  updateComment = {updateComment}
                  onChangeEditTextComment = {onChangeEditTextComment}
                  removeComment = {removeComment}
                  commentText = {commentText}
                  isEditingComment = {isEditingComment}
                  />
            </ListItem>

            <Divider variant="inset" component="li" />

          </React.Fragment>
        ))}
      </List>
    </SideBlock>
  );
};