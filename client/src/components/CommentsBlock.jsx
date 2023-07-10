import React from "react";

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";

export const CommentsBlock = ({isLoading=true}) => {
  const comments = useSelector(state=>state.comments.items)

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
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <ListItemText
                  primary={comment.user.fullName}
                  secondary={comment.text}
                />
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </SideBlock>
  );
};