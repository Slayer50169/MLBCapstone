import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createFilterOptions } from '@mui/core';

function SearchBar({ players, teams }) {
  const filterOptions = createFilterOptions({
    limit: 10
  });

  const navigate = useNavigate();

  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
    
  function handleChange(event, newValue){
      setValue(newValue)
      if(newValue === null) return;
      navigate(newValue?.fullName ? `/player/${newValue.id}` : `/team/${newValue.id}`)
  }

  return (
    <Autocomplete
      disablePortal
      value={value || null}
      inputValue={inputValue}
      onChange={handleChange}
      freeSolo={true}
      onInputChange={(event, newInputVal)=>{
        setInputValue(newInputVal);
      }}
      filterOptions={filterOptions}
      options={[...players, ...teams]}
      sx={{ width: 400}}
      renderInput={(params) => <TextField {...params} sx={{ input: {color: 'black', 'background-color': 'white'}, '.Mui-focused' : {color: 'gray'}, label: {color: 'gray'}, div: {'background-color': 'white'} }} size='small' label="Search for players or teams" />}
      getOptionLabel={(player) => {
        if(player?.fullName) return player.fullName;
        return player.name
      }}
      renderOption={(props, option) => (
        <Box  component="li" sx={{ '&': { mr: 2}}} {...props}>
          {option?.fullName ? option.fullName : option.name}
        </Box>
      )}
    />
  );
}
export default SearchBar;
