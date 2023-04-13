import React from 'react'
import style from './SideBlock.module.scss'
import {SearchInput} from '../SearchInput'

import { Paper, Typography } from '@mui/material'

export const SideBlock = ({title, withSearch, children}) => {
  
  return (
    <Paper className={style.root}>
      {withSearch?(
        <div className={style.tagsHeader}>
          <Typography variant="h6" className={style.title}>
            {title}
          </Typography>
          <SearchInput />
        </div>):(
          (<Typography variant="h6" className={style.title}>
          {title}
          </Typography>)
        )
      }
        
        
        {children}
    </Paper>
  )
}
