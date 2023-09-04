import React from 'react'
import style from './Comment.module.scss'

import { IconButton, ListItemText, Skeleton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Clear";
import CheckIcon from '@mui/icons-material/Check';

const Comment = (
        {comment,
        onlyLastComments,
        updateComment,
        onChangeEditTextComment,
        removeComment,
        userId,
        isEditingComment,
        commentText,
        isLoading,
        }) => {
    return (

        // SKELETON or COMMENT
        isLoading ? 
            <div className={style.commentSkeleton}>
                <Skeleton variant="text" height={25} width={120} />
                <Skeleton variant="text" height={18} width={230} />
            </div> 
            :
            <div className={style.commentWrapper}>
                {!comment.isEditable? 
                <ListItemText
                    primary={comment.user.fullName}
                    secondary={comment.text}
                /> 
                : 
                <>
                    { userId===comment.user._id ? 
                        <div className = {style.editSector}>
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
                        </div>
                        :
                        <ListItemText
                        primary={`${comment.user.fullName}` }
                        secondary={comment.text}
                    />}
                </>
                }
                
                {(userId===comment.user._id && comment.isEditable) ?

                    // CHECK ICON
                    <div className={style.acceptBtn}>
                        <IconButton color="primary" onClick = {()=>updateComment(comment._id, {text:commentText, isEditable:false})}>
                            <CheckIcon />
                        </IconButton>
                    </div>
                        :

                    // EDIT ICONS
                    <>
                        { (userId===comment.user._id && !isEditingComment && !comment.isEditable && !onlyLastComments) &&
                            <div className={style.editBtns}>
                                <IconButton color="primary" onClick = {()=>updateComment(comment._id, {isEditable:true})}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="secondary" onClick = {()=>removeComment(comment._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        }
                    </>
                }

            </div>
        
  )
}

export default Comment