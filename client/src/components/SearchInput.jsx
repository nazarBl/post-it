import React from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const SearchInput = () => {
  const [searchValue, setSearchValue] = React.useState('')
  const navigate = useNavigate();

  const searchPostsByTag = (tagName, e)=>{
    if(e.key && e.key==="Enter"){
      setSearchValue('')
      tagName = tagName.split(' ').map(word=>word.replace(word.split('')[0], word.split('')[0].toUpperCase())).join('')
      navigate(`/posts?tagName=${tagName}`)
    }
    
  }
  return (
    <TextField 
            type="search" 
            label="Tag to search"
            variant="standard"

            value={searchValue}
            onChange={e=>setSearchValue(e.target.value)}
            onKeyUp={e=>searchPostsByTag(searchValue, e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
  )
}
