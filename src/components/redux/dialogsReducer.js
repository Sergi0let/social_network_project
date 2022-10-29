const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

const initialState = {
  messagesData: [
    { id: 1, message: 'Hello' },
    { id: 2, message: 'How are you' },
    { id: 3, message: 'Thanks, I am fine' },
    { id: 4, message: 'Lorem ipsum dolor sit.' },
  ],
  dialogsData: [
    { id: 1, name: 'Brosik' },
    { id: 2, name: 'Salem' },
    { id: 3, name: 'Rex' },
    { id: 4, name: 'Jedi' },
    { id: 5, name: 'Jedi' },
    { id: 6, name: 'Lexx' },
    { id: 7, name: 'Le' },
    { id: 8, name: 'you' },
  ],
  newMessageBody: '',
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      return {
        ...state,
        newMessageBody: action.body,
      };

    case SEND_MESSAGE: {
      let body = state.newMessageBody;
      return {
        ...state,
        newMessageBody: '',
        messagesData: [...state.messagesData, { id: 6, message: body }],
      };
    }

    default:
      return state;
  }
};
export default dialogsReducer;

export const sendMessage = () => ({ type: SEND_MESSAGE });
export const updateMessageBody = (body) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: body,
});
