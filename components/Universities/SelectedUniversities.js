import React, { useState, useContext, useEffect } from 'react';
import { UniversityContext } from './../UniversityContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
const SelectedUniversities = (props) => {
  const universities = useContext(UniversityContext);
  const [universityList, setUniversityList] = useState(null);

  useEffect(() => {
    console.log('props.selecteduniversities..', props.selecteduniversities);
    setUniversityList(props.selecteduniversities);
  }, [props.selecteduniversities]);
  const removeUser = (user) => {
    universityList.forEach((usr, index) => {
      if (usr.event_id === user.event_id) {
        universityList.splice(index, 1);
      }
    });
    let results = [...universities];
    results = results.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.event_id === item.event_id)
    );
    results.push(user);
    const obj = {};
    obj['universities'] = results;
    obj['selectedUnviersity'] = universityList;
    setUniversityList(universityList);
    props.sendUniversity(obj);
    // setUniversityList([...results]);
  };

  const changePosition = (action, id, index) => {
    if (universityList.length > 1) {
      let prevUniversityList = [...universityList];
      if (index !== 0 || index !== universityList.length - 1) {
        if (action === 'up') {
          const deletedItem = prevUniversityList.splice(index, 1)[0];
          prevUniversityList.splice(index - 1, 0, deletedItem);
          setUniversityList([...prevUniversityList]);
        } else if (action === 'down') {
          const deletedItem = prevUniversityList.splice(index, 1);
          prevUniversityList.splice(index + 1, 0, ...deletedItem);
          setUniversityList([...prevUniversityList]);
        }
      }
    }
  };
  return (
    <div>
      {universityList ? (
        <h2>Total Selected universities: {universityList.length}</h2>
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
                    <FontAwesomeIcon
                      icon={faArrowAltCircleUp}
                      onClick={() => changePosition('up', user.event_id, index)}
                    />
                &emsp;
                    <FontAwesomeIcon
                      icon={faArrowAltCircleDown}
                      onClick={() =>
                        changePosition('down', user.event_id, index)
                      }
                    />
                  &emsp;
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={() => removeUser(user)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default SelectedUniversities;
