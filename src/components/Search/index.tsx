import React, {ChangeEvent} from 'react';
import {iconSearch} from "../../assets";

type Props = {
  value: string,
  onChange: (value: string) => void,
}
const Search: React.FC<Props> = ({value, onChange}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className='c-search'>
      <img src={iconSearch} alt=''/>
      <input value={value} onChange={handleChange} placeholder='Search for movies or TV series' type='search' name='search' id='search'/>
    </div>
  );
};

export default Search;
