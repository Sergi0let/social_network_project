const initialState = {
  userFriends: [
    { id: '18', name: 'Brosik' },
    { id: '29', name: 'Salem' },
    { id: '30', name: 'Rex' },
  ],
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default sidebarReducer;
