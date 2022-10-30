const initialState = {
  userFriends: [
    { id: 1, name: 'Brosik' },
    { id: 2, name: 'Salem' },
    { id: 3, name: 'Rex' },
  ],
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default sidebarReducer;
