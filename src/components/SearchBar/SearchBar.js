import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createFilterOptions } from '@mui/core';
import './SearchBar.css';

function SearchBar({ players, teams }) {
  const filterOptions = createFilterOptions({
    limit: 5
  });

  const navigate = useNavigate();

  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
    
  function handleChange(event, newValue){
      if(newValue?.name || newValue?.fullName){
        setValue(newValue)
        console.log("navigating")
        navigate(newValue?.fullName ? `/player/${newValue.id}` : `/team/${newValue.id}`)
      }
  }

  return (
    <Autocomplete
      disablePortal
      value={value}
      inputValue={inputValue}
      onChange={handleChange}
      freeSolo={true}
      onInputChange={(event, newInputVal)=>{
        setInputValue(newInputVal);
      }}
      noOptionsText='Nothing found!'
      filterOptions={filterOptions}
      options={[...players, ...teams]}
      className='search'
      sx={{position: 'absolute'}}
      renderInput={(params) => <TextField placeholder="Search for teams or players"  {...params} sx={{ 'label:focused': {display: 'hidden'}, input: {color: 'black', 'background-color': 'white'}, '.Mui-focused' : {color: 'gray'}, label: {color: 'gray'}, div: {'background-color': 'white'} }} size='small' />}
      getOptionLabel={(option) => {
        if (option?.fullName) return option.fullName
        else if (option?.name) return option.name
        else return ''
      }}
      renderOption={(props, option) => (
        <Box  component="li" sx={{ '&': { mr: 2}, height: '100%'}} {...props}>
          <img style={{height: '100%', width: '25%', objectFit: 'contain'}} src={option?.fullName ? `https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${option.id}/headshot/67/current` : `https://www.mlbstatic.com/team-logos/team-cap-on-light/${option.id}.svg` } alt={option?.fullName ? option.fullName : `${option.name} logo`}/>
          {option?.fullName ? option.fullName : option.name}
        </Box>
      )}
    />
  );
}
export default SearchBar;
