import React, { useState, useEffect } from 'react';

import { getUsers } from '../../store/actions/users';
import { connect } from 'react-redux';
import UserList from './UserList';
import { isEmpty } from 'lodash';

const UserTable = (props) => {
  useEffect(() => {
    if (isEmpty(props.users)) {
      props.getUsers();
    }
  }, [props.counter, props.getUsers]);
  return (
    <div>
      <h2>List of users : {props.users.length}</h2>

      <UserList />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsers()),
  };
};
const mapStateToProps = (state) => {
  return {
    users: state.usersReducer.users,
    counter: state.counterReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
