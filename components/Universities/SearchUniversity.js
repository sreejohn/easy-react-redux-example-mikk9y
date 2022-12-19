import React from 'react';
import React, { useState, useContext, useEffect } from 'react';
import { UniversityContext } from './../UniversityContext';

const SearchUniversity = (props) => {
  const universities = props.universities1;
  const [selected, setSelected] = useState('none');
  const handleDropDown = (e) => {
    props.sendDropDownValue(e.target.value);
    setSelected(e.target.value);
  };
  return (
    <div>
      <select onChange={(e) => handleDropDown(e)}>
        <option label=" "></option>
        {universities &&
          universities.map((user) => {
            return (
              <option value={user.city}>{user.city}</option>
            );
          })}
      </select>
    </div>
  );
};

export default SearchUniversity;
