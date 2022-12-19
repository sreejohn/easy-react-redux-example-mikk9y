// https://api.fda.gov/food/enforcement.json?limit=100
import React, { useState, useEffect, createContext } from 'react';
import AllUniversities from './AllUniversities';
import SelectedUniversities from './SelectedUniversities';
import { UniversityContext } from './../UniversityContext';
import Select from 'react-select';
import SearchUniversity from './SearchUniversity';

const UniversityList = () => {
  const [universities, setUniversities] = useState(null);
  const [universities1, setUniversities1] = useState(null);
  const [selecteduniversities, setSelectedUniversities] = useState([]);
  const URl = 'https://api.fda.gov/food/enforcement.json?limit=100';

  useEffect(() => {
    if (!universities) {
      fetch(URl)
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          let results = response.results;
          results = results.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.event_id === item.event_id)
          );
          results = results.sort((a, b) => a.event_id - b.event_id);
          setUniversities(results);
          setUniversities1(results);
        });
    }
  }, []);
  const getUniversity = (obj) => {
    const updateList = [...selecteduniversities, ...obj.selectedUnviersity];
    let results = updateList;
    results = results.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.event_id === item.event_id)
    );

    let results1 = obj.universities;
    results1 = results1.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.event_id === item.event_id)
    );
    results1 = results1.sort((a, b) => a.event_id - b.event_id);
    setUniversities(results1);
    setSelectedUniversities(results);
  };
  const getDropDownValue = (value) => {
    console.log('value..', value);
    if (value) {
      let results = universities1;
      results = results.filter((item) => {
        return item.city.includes(value);
      });
      results = results.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.event_id === item.event_id)
      );
      results = results.sort((a, b) => a.event_id - b.event_id);
      setUniversities(results);
    } else {
      console.log('in else', selecteduniversities.length);
      let result = universities1.filter(f =>
        !selecteduniversities.some(d => d.event_id == f.event_id)
      );

     
      console.log('newResult..', result.length);
      result = result.sort((a, b) => a.event_id - b.event_id);
      setUniversities(result);
    }
  };
  return (
    <div>
      <UniversityContext.Provider value={universities}>
        <SearchUniversity
          sendDropDownValue={getDropDownValue}
          universities1={universities1}
        />
        <div className="university-row">
          <div className="university-col1">
            <AllUniversities sendUniversity={getUniversity} />
          </div>
          <div className="university-col2">
            <SelectedUniversities
              selecteduniversities={selecteduniversities}
              sendUniversity={getUniversity}
            />
          </div>
        </div>
      </UniversityContext.Provider>
    </div>
  );
};

export default UniversityList;
