export const usersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case 'USERS':
      return { users: action.payload };

    default:
      return state;
  }
};

export default usersReducer;
