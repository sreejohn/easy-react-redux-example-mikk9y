import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsers1 } from '../../store/actions/users';

const UserList = (props) => {
  const { users } = props;
  const [list, setList] = useState(null);
  useEffect(() => {
    setList(users);
  }, []);
  const removeUser = (user) => {
    const newlist = [];
    list.forEach((usr, index) => {
      if (usr.id === user.id) {
        list.splice(index, 1);
      }
      newlist.push(usr);
    });
    props.getUsers1(newlist);
    setList([...newlist]);
  };
  return (
    <div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.title}</td>
                  <td>{user.complete ? 'Completed' : 'Pending'}</td>
                  <td>
                    <button onClick={() => removeUser(user)}>Remove</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    users: state.usersReducer.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers1: (list) => dispatch(getUsers1(list)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
