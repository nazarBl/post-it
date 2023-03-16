import React from 'react'
import style from './SideBlock.module.scss'

import { Paper, Typography } from '@mui/material'

export const SideBlock = ({title, children}) => {
  return (
    <Paper className={style.root}>
        <Typography cariant="h6" className={style.title}>
            {title}
        </Typography>
        {children}
    </Paper>
  )
}
