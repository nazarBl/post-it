import React from "react";

import {List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar} from "@mui/material"

export const SideComments = ({ items }) => {
  return (
    <List>
      {items.map((obj) => (
        <React.Fragment key={obj.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
            </ListItemAvatar>
            <ListItemText primary={obj.user.fullName} secondary={obj.text} />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};