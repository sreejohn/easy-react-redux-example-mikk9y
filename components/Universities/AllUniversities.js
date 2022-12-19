import React, { useState, useContext, useEffect } from 'react';
import { UniversityContext } from './../UniversityContext';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/fontawesome-free-solid';
const AllUniversities = (props) => {
  const universities = useContext(UniversityContext);
  const [universityList, setUniversityList] = useState(universities);

  useEffect(() => {
    setUniversityList(universities);
  }, [universities]);
  const removeUser = (user) => {
    universities.forEach((usr, index) => {
      if (usr.event_id === user.event_id) {
        universities.splice(index, 1);
      }
    });
    let results = [...universities];
    results = results.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.event_id === item.event_id)
    );
    const selectedUnviersity = [];
    selectedUnviersity.push(user);
    const obj = {};
    obj['universities'] = results;
    obj['selectedUnviersity'] = selectedUnviersity;
    props.sendUniversity(obj);
    setUniversityList([...results]);
  };
  return (
    <div>
      {universityList ? (
        <h2>Total universities: {universityList.length}</h2>
      ) : null}
      <table className="users-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Country</th>
            <th>City</th>
            <th> Branch </th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {universityList &&
            universityList.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.country}</td>
                  <td>{user.city}</td>
                  <td>{user.recalling_firm} </td>
                  <td>{user.status}</td>
                 
                  <td>
                    <button onClick={() => removeUser(user, index)}>
                      Select
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AllUniversities;
