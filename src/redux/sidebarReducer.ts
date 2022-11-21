import { UserFriendsType } from '../types/types';

const initialState = {
  userFriends: [
    { id: '18', name: 'Brosik' },
    { id: '29', name: 'Salem' },
    { id: '30', name: 'Rex' },
  ] as Array<UserFriendsType>,
};

type InitialStateType = typeof initialState;

const sidebarReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    default:
      return state;
  }
};

export default sidebarReducer;
